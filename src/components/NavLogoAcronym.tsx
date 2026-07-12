'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/navigation';

/**
 * NavLogoAcronym — het interactieve AiPOX-lettermerk in de header (MB-005).
 *
 * Volgt docs/design-brief.md §4:
 * - "AIP-X" blijft statisch; we narren één letter (de A — merkregel A = Arthur).
 * - Hover (desktop) / tap-affordance (mobiel) onthult de betekenis via een
 *   verfijnde decoder/type-shuffle (mono-vibe) — geen slot-machine, geen geluid.
 * - Elke onthulde betekenis is waar: gecureerde subset uit public/meanings.json.
 * - prefers-reduced-motion → directe swap (geen scramble).
 * - Klik/Enter op het merk navigeert naar Home; de onthulling zit op hover/affordance.
 */

// De letter die we narren als merkregel. Brief §4: "A = Arthur".
const LETTER = 'A';
// Gecureerde subset (geen letter-soup van 5 gelijkwaardige betekenissen).
const MAX_FACETS = 3;
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const CYCLE_MS = 1500; // rusttijd per betekenis tijdens het narren
const CYCLE_REDUCED_MS = 2200; // iets rustiger bij reduced-motion (directe swaps)
const SCRAMBLE_MS = 420; // duur van de decoder-resolve

type MeaningsData = Record<string, Record<string, string[]>>;

// Fallback wanneer meanings.json niet laadt — matcht de canonieke A-verhaallijn.
const FALLBACK = ['Arthur', 'Artificial', 'Automation'];

export default function NavLogoAcronym() {
  const locale = useLocale();
  const t = useTranslations('nav');

  const [facets, setFacets] = useState<string[]>(FALLBACK);
  const [index, setIndex] = useState(0);
  const [display, setDisplay] = useState<string>(FALLBACK[0]);

  // Onthullings-triggers: hover (desktop), focus (toetsenbord), pinned (tap).
  const [hover, setHover] = useState(false);
  const [focused, setFocused] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [reduce, setReduce] = useState(false);

  const rafRef = useRef<number | null>(null);
  const active = hover || focused || pinned;

  // prefers-reduced-motion volgen (live).
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduce(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Betekenissen laden uit public/meanings.json (absoluut pad; mijdt locale-routing).
  useEffect(() => {
    let cancelled = false;
    fetch('/meanings.json')
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: MeaningsData) => {
        if (cancelled) return;
        const list = data?.[locale]?.[LETTER];
        if (Array.isArray(list) && list.length > 0) {
          setFacets(list.slice(0, MAX_FACETS));
        }
      })
      .catch(() => {
        /* fallback blijft staan */
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Index-beheer: bij activering speelt het verhaal één keer af (Arthur → Artificial
  // → Automation) en rust dan — leest als storytelling, niet als besluiteloosheid.
  // Idle rust altijd op de canonieke merkregel (index 0 = Arthur).
  useEffect(() => {
    if (!active || facets.length <= 1) {
      setIndex(0);
      return;
    }
    // Direct feedback: spring naar het eerste facet, loop daarna één keer door tot het einde.
    setIndex(1);
    const step = reduce ? CYCLE_REDUCED_MS : CYCLE_MS;
    const id = setInterval(() => {
      setIndex((i) => {
        if (i >= facets.length - 1) {
          clearInterval(id); // rust op het laatste facet
          return i;
        }
        return i + 1;
      });
    }, step);
    return () => clearInterval(id);
  }, [active, reduce, facets.length]);

  // Weergave: scramble bij motion, directe swap bij idle of reduced-motion.
  useEffect(() => {
    const word = active ? (facets[index] ?? facets[0]) : facets[0];

    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!active || reduce) {
      setDisplay(word);
      return;
    }

    const start = performance.now();
    const len = word.length;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / SCRAMBLE_MS);
      const resolved = Math.floor(p * len);
      let out = '';
      for (let i = 0; i < len; i += 1) {
        if (i < resolved || word[i] === ' ') {
          out += word[i];
        } else {
          out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
      }
      setDisplay(out);
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setDisplay(word);
        rafRef.current = null;
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [index, active, reduce, facets]);

  // Betekenisvol doel voor screenreaders (het echte woord, niet de scramble).
  const target = active ? (facets[index] ?? facets[0]) : facets[0];
  const homeAria = `AiPOX — ${t('home')}`;
  const revealAria = `${t('acronymReveal')} — A: ${target}`;

  const markLetters = 'AiPOX'.split('');

  return (
    <div
      className="nav-acronym"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
      }}
    >
      <Link href="/" aria-label={homeAria} className="nav-acronym__mark">
        {markLetters.map((ch, i) => (
          <span
            key={`${ch}-${i}`}
            className={
              ch === 'A'
                ? `nav-acronym__letter nav-acronym__letter--a${active ? ' is-active' : ''}`
                : 'nav-acronym__letter'
            }
          >
            {ch}
          </span>
        ))}
      </Link>

      {/* Decoder-onthulling — absoluut gepositioneerd, geen layout-shift in de navbar. */}
      <span className={`nav-acronym__caption${active ? ' is-active' : ''}`} aria-hidden="true">
        <span className="nav-acronym__lead">A</span>
        <span className="nav-acronym__sep">·</span>
        <span className="nav-acronym__word">{display}</span>
      </span>

      {/* Affordance — knop (geen link), zodat tap/klik hier niet naar Home navigeert. */}
      <button
        type="button"
        className={`nav-acronym__tryme${active ? ' is-active' : ''}`}
        aria-label={revealAria}
        aria-pressed={pinned}
        onClick={() => setPinned((p) => !p)}
      >
        <span className="nav-acronym__tryme-dot" aria-hidden="true" />
        <span className="nav-acronym__tryme-label" aria-hidden="true">
          {t('acronymTryMe')}
        </span>
      </button>
    </div>
  );
}

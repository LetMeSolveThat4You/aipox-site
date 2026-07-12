'use client';

import { useState, useEffect } from 'react';
import { useSharedLogoAnimation } from '@/hooks/useSharedLogoAnimation';

interface InteractiveLogoProps {
  className?: string;
  autoRotate?: boolean;
  autoRotateInterval?: number;
  size?: 'xs' | 'small' | 'medium' | 'large';
  showMeanings?: boolean;
  showTryMe?: boolean;
}

const InteractiveLogo = ({
  className = '',
  autoRotate = true,
  autoRotateInterval = 15000,
  size = 'medium',
  showMeanings = true,
  showTryMe = true,
}: InteractiveLogoProps) => {
  const {
    currentMeanings,
    triggerAnimation,
    registerAnimationCallback,
    registerMeaningUpdateCallback,
  } = useSharedLogoAnimation();

  const [letterAnimations, setLetterAnimations] = useState<boolean[]>(new Array(5).fill(false));
  const [meaningAnimations, setMeaningAnimations] = useState<('idle' | 'slide-out' | 'slide-in')[]>(
    new Array(5).fill('idle')
  );
  const [localMeanings, setLocalMeanings] = useState<string[]>(currentMeanings);

  // Auto-rotate timer
  useEffect(() => {
    if (!autoRotate) return;

    const autoRotateTimer = setInterval(() => {
      triggerAnimation(false); // false = automatic rotation
    }, autoRotateInterval);

    return () => clearInterval(autoRotateTimer);
  }, [autoRotate, autoRotateInterval, triggerAnimation]);

  // Register this logo instance for shared animations
  useEffect(() => {
    const unregisterAnimation = registerAnimationCallback(() => {
      // Trigger letter spin animation
      ['A', 'I', 'P', 'O', 'X'].forEach((_, index) => {
        setTimeout(() => {
          setLetterAnimations((prev) => {
            const next = [...prev];
            next[index] = true;
            return next;
          });

          // Reset letter animation
          setTimeout(() => {
            setLetterAnimations((prev) => {
              const next = [...prev];
              next[index] = false;
              return next;
            });
          }, 600);
        }, index * 150);
      });

      // Trigger staggered meaning slide-out animation
      if (showMeanings) {
        ['A', 'I', 'P', 'O', 'X'].forEach((_, index) => {
          setTimeout(() => {
            setMeaningAnimations((prev) => {
              const next = [...prev];
              next[index] = 'slide-out';
              return next;
            });
          }, index * 80); // Consistent 80ms delay
        });
      }
    });

    const unregisterMeaningUpdate = registerMeaningUpdateCallback((newMeanings) => {
      if (showMeanings) {
        // Step 1: All words slide out simultaneously but with staggered delays
        newMeanings.forEach((_, index) => {
          setTimeout(() => {
            setMeaningAnimations((prev) => {
              const next = [...prev];
              next[index] = 'slide-out';
              return next;
            });
          }, index * 80); // Slightly faster delay
        });

        // Step 2: After all slide-outs are complete, update content and slide in
        const totalSlideOutTime = newMeanings.length * 80 + 400; // Stagger time + animation duration

        setTimeout(() => {
          // Update all meanings at once
          setLocalMeanings(newMeanings);

          // Then slide in with staggered delays
          newMeanings.forEach((_, index) => {
            setTimeout(() => {
              setMeaningAnimations((prev) => {
                const next = [...prev];
                next[index] = 'slide-in';
                return next;
              });

              // Reset to idle after slide-in completes
              setTimeout(() => {
                setMeaningAnimations((prev) => {
                  const next = [...prev];
                  next[index] = 'idle';
                  return next;
                });
              }, 400); // Duration of slide-in animation
            }, index * 80);
          });
        }, totalSlideOutTime);
      }
    });

    return () => {
      unregisterAnimation();
      unregisterMeaningUpdate();
    };
  }, [registerAnimationCallback, registerMeaningUpdateCallback, showMeanings]);

  // Helper function to apply highlight rules according to logo instructions
  const applyHighlight = (word: string, letter: string) => {
    // A, I, P, O: First letter highlight
    if (['A', 'I', 'P', 'O'].includes(letter)) {
      return (
        <>
          <span className="highlight">{word.charAt(0)}</span>
          {word.slice(1)}
        </>
      );
    }

    // X: Second letter highlight (only for words with 'x' on 2nd position)
    if (letter === 'X') {
      const hasXAtPosition1 = word.toLowerCase().charAt(1) === 'x';
      if (hasXAtPosition1) {
        return (
          <>
            {word.charAt(0)}
            <span className="highlight">{word.charAt(1)}</span>
            {word.slice(2)}
          </>
        );
      }
    }

    // Default: no highlight
    return word;
  };

  // Size class configurations
  const sizeClasses = {
    xs: {
      logo: 'text-sm font-medium logo-tracking-small',
      meanings: 'text-xs',
      container: 'gap-1',
      letterSpacing: 'aipox-letter-small',
      tryMeContainer: 'text-[9px] w-6 h-6',
      tryMeSvg: 'w-6 h-6',
    },
    small: {
      logo: 'text-fluid-lg logo-tracking-small',
      meanings: 'text-xs md:text-sm',
      container: 'gap-2',
      letterSpacing: 'aipox-letter-small',
      tryMeContainer: 'text-xs w-10 h-10',
      tryMeSvg: 'w-10 h-12',
    },
    medium: {
      logo: 'text-fluid-2xl logo-tracking-default',
      meanings: 'text-xs md:text-sm',
      container: 'gap-4',
      letterSpacing: 'aipox-letter-medium',
      tryMeContainer: 'text-sm w-12 h-14',
      tryMeSvg: 'w-12 h-14',
    },
    large: {
      logo: 'text-fluid-6xl logo-tracking-default',
      meanings: 'text-fluid-lg',
      container: 'gap-6',
      letterSpacing: 'aipox-letter-large',
      tryMeContainer: 'text-base w-20 h-28',
      tryMeSvg: 'w-20 h-28',
    },
  };

  const classes = sizeClasses[size];

  return (
    <div
      className={`aipox-logo flex flex-col items-center ${classes.container} ${className}`}
      onClick={() => triggerAnimation(false)}
      role="button"
      tabIndex={0}
      aria-label="Interactive AiPOX logo"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerAnimation(false);
        }
      }}
    >
      {/* Logo Letters */}
      <div className={`${classes.logo} text-center cursor-pointer select-none relative`}>
        {['A', 'I', 'P', 'O', 'X'].map((letter, index) => (
          <span key={letter}>
            <span
              className={`aipox-letter inline-block text-center ${classes.letterSpacing} ${letterAnimations[index] ? 'spin' : ''}`}
            >
              {letter}
            </span>
            {index < 4 && <span className={`aipox-dot aipox-dot-${index + 1}`}>•</span>}
          </span>
        ))}

        {/* Try Me Indicator */}
        {showTryMe && size !== 'small' && size !== 'xs' && (
          <div
            className={`try-me-indicator flex flex-col items-center justify-center ${classes.tryMeContainer}`}
          >
            <span className="uppercase tracking-wide text-[0.6rem] opacity-80">try me</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 119 161"
              className={`${classes.tryMeSvg} mt-1`}
              aria-hidden="true"
            >
              <g
                transform="translate(0,161) scale(0.1,-0.1)"
                fill="none"
                stroke="currentColor"
                strokeWidth="14"
              >
                <path
                  d="M790 1475 c0 -8 14 -56 31 -107 25 -74 33 -115 37 -203 
                10 -234 -55 -364 -222 -445 l-81 -39 -25 112 c-21 96 -28 112 -46 115 
                -17 2 -58 -42 -200 -214 -98 -120 -190 -232 -203 -250 -35 -48 -24 -77 
                42 -107 148 -70 509 -227 523 -227 8 0 17 7 20 15 5 12 -12 102 -42 221 
                -5 19 -2 24 14 24 38 0 182 81 241 136 120 111 187 256 197 428 
                11 179 -52 351 -175 476 -65 66 -111 93 -111 65z"
                />
              </g>
            </svg>
          </div>
        )}
      </div>

      {/* Meaning Words */}
      {showMeanings && size !== 'xs' && size !== 'small' && (
        <div
          className={`aipox-meanings ${classes.meanings} flex flex-wrap justify-center items-center gap-2 min-h-8`}
        >
          {localMeanings.map((meaning, index) => (
            <span
              key={`${meaning}-${index}`}
              className={`meaning-word transition-all duration-400 ${meaningAnimations[index]}`}
            >
              {applyHighlight(meaning, ['A', 'I', 'P', 'O', 'X'][index])}
              {index < localMeanings.length - 1 && (
                <span className="meaning-separator opacity-40 ml-1">•</span>
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default InteractiveLogo;

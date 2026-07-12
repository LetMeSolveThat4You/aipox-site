"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Linkedin, Mail } from 'lucide-react';

function FooterLogo() {
  return (
    <div className="flex items-center justify-center md:justify-start">
      <Image
        src="/logos/light_wordmark_notagline_transparent.png"
        alt="AiPOX"
        width={226}
        height={30}
        className="h-[30px] w-auto object-contain"
      />
    </div>
  );
}

export default function Footer() {
  const t = useTranslations('footer');

  return (
    <footer className="w-full bg-gradient-to-t from-muted/30 to-transparent pt-16 pb-6 mt-auto border-t border-border/20">
      <div className="container max-w-7xl mx-auto px-6">
        {/* Main Footer Content - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-start mb-12">
          
          {/* Column 1 - Logo Only */}
          <div className="flex items-start justify-center md:justify-start">
            <FooterLogo />
          </div>

          {/* Column 2 - Contact Information */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground text-base">{t('contact.title')}</h4>
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <a 
                href="mailto:info@aipox.nl" 
                className="flex items-center gap-2.5 hover:text-primary transition-colors group"
              >
                <Mail className="w-4 h-4 text-primary/60 group-hover:text-primary transition-colors flex-shrink-0" />
                <span>{t('contact.email')}</span>
              </a>
              <p className="flex items-center gap-2.5">
                <span className="text-primary/60 text-base flex-shrink-0">📞</span>
                <span>{t('contact.phone')}</span>
              </p>
            </div>
            <p className="text-xs text-muted-foreground/70 pt-2">
              {t('company')}
            </p>
          </div>

          {/* Column 3 - Taglines & Connect */}
          <div className="space-y-4 md:text-right">
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {t('tagline')}
              </p>
            </div>

            {/* Subtiele link naar de "Zo bouw ik"-pagina (MB-008) */}
            <div>
              <Link
                href="/how-i-build"
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {t('howIBuild')}
              </Link>
            </div>

            <div className="pt-2">
              <h4 className="font-semibold text-foreground text-base mb-3">{t('social.title')}</h4>
              <div className="flex items-center justify-center md:justify-end gap-5">
                <a
                  href="https://www.linkedin.com/in/arthurscheen/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="mailto:info@aipox.nl"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Separator */}
        <hr className="border-border/30 mb-6" />

        {/* Bottom Bar - Copyright & Legal Links */}
        <div className="text-center space-y-3">
          <p className="text-xs text-muted-foreground/80">
            {t('copyright')}
          </p>
          <div className="flex items-center justify-center gap-3 text-xs text-muted-foreground/70">
            <Link 
              href="/legal" 
              className="hover:text-primary transition-colors"
            >
              {t('links.disclaimer')}
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link 
              href="/legal" 
              className="hover:text-primary transition-colors"
            >
              {t('links.privacy')}
            </Link>
            <span className="text-muted-foreground/40">•</span>
            <Link 
              href="/legal" 
              className="hover:text-primary transition-colors"
            >
              {t('links.terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

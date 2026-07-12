'use client';

import { AuthorAvatar } from './AuthorAvatar';

interface QuoteCardProps {
  quote: string;
  author: string;
  imageSrc?: string;
  imageAlt?: string;
  showImage?: boolean;
  priority?: boolean;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function QuoteCard({
  quote,
  author,
  imageSrc = '/portret.jpg',
  imageAlt,
  showImage = true,
  size = 'medium',
  className = '',
  priority = false,
}: QuoteCardProps) {
  // Size configurations
  const sizeConfig = {
    small: {
      padding: 'p-4',
      gap: 'gap-4',
      quoteText: 'text-base',
      authorText: 'text-xs',
      minHeight: 'min-h-20',
    },
    medium: {
      padding: 'p-6',
      gap: 'gap-5',
      quoteText: 'text-lg',
      authorText: 'text-sm',
      minHeight: 'min-h-24',
    },
    large: {
      padding: 'p-8',
      gap: 'gap-6',
      quoteText: 'text-xl',
      authorText: 'text-base',
      minHeight: 'min-h-32',
    },
  };

  const config = sizeConfig[size];

  return (
    <div
      className={`card-surface relative ${config.padding} rounded-2xl bg-gradient-to-br from-background/60 to-background/20 backdrop-blur-md border border-muted/20 shadow-xl ${className}`}
    >
      <div className={`flex ${config.gap} items-center ${!showImage ? 'justify-center' : ''}`}>
        {/* Profile Picture - conditionally rendered */}
        {showImage && (
          // Prefer next-gen formats (AVIF/WebP) when available. The included
          // `scripts/convert-images.js` can generate `public/portret.avif` and
          // `public/portret.webp` from the original JPG.
          <div className="flex-shrink-0">
            <picture>
              <source srcSet="/portret.avif" type="image/avif" />
              <source srcSet="/portret.webp" type="image/webp" />
              <AuthorAvatar
                author={author}
                imageSrc={imageSrc}
                imageAlt={imageAlt}
                size={size}
              />
            </picture>
          </div>
        )}

        {/* Quote Section - Right side */}
        <div className="flex-1 flex flex-col justify-center">
          {/* Quote */}
          <blockquote
            className={`${config.quoteText} font-medium text-foreground/90 italic leading-relaxed`}
          >
            {quote}
          </blockquote>

          {/* Author attribution - same line, right aligned */}
          <div className="text-right mt-2">
            <cite className={`not-italic text-muted-foreground ${config.authorText}`}>
              — {author}
            </cite>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface AuthorAvatarProps {
  author: string;
  imageSrc?: string;
  imageAlt?: string;
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export function AuthorAvatar({
  author,
  imageSrc = '/portret.jpg',
  imageAlt,
  size = 'medium',
  className = '',
}: AuthorAvatarProps) {
  // Map sizes to consistent dimensions
  const sizeClasses = {
    small: 'h-16 w-16 text-lg',
    medium: 'h-20 w-20 text-xl',
    large: 'h-24 w-24 text-2xl',
  };

  const initials = author
    ?.split(' ')
    .filter(Boolean)
    .map((n) => n[0]?.toUpperCase())
    .join('');

  return (
    <Avatar className={cn(sizeClasses[size], className)}>
      <AvatarImage src={imageSrc} alt={imageAlt || author} />
      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 border-2 border-primary/20">
        {initials || 'AS'}
      </AvatarFallback>
    </Avatar>
  );
}

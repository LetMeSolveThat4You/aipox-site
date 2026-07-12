'use client';

import React from 'react';
import { ChevronDown } from 'lucide-react';

type Props = {
  label: string;
  targetId?: string;
  className?: string;
  ariaLabel?: string;
};

const ScrollToAboutButton = ({ label, targetId = 'about', className = '', ariaLabel }: Props) => {
  const onClick = () => {
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-all duration-300 cursor-pointer bg-transparent border-0 p-2 group ${className}`}
      aria-label={ariaLabel ?? label}
    >
      <span className="hidden sm:inline">{label}</span>
      <ChevronDown className="h-5 w-5 animate-bounce group-hover:translate-y-1 transition-transform" />
    </button>
  );
};

export default ScrollToAboutButton;

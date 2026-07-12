'use client';

import { useState, useEffect } from 'react';
import InteractiveLogo from './InteractiveLogo';

export default function ResponsiveLogo() {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return <InteractiveLogo size={isMobile ? 'medium' : 'large'} />;
}

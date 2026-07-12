"use client";

import { useState } from 'react';
import { NAV_LINKS } from '@/config/NAV_LINKS';
import Image from 'next/image';
import ThemeToggle from '@/components/ThemeToggle';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger, NavigationMenuContent } from '@/components/ui/navigation-menu';
import NavLogoAcronym from '@/components/NavLogoAcronym';

// Static image logo — used inside the mobile navigation sheet only.
function MobileLogo() {
  // Responsive sizing: larger on very small screens, slightly smaller on md
  return (
    <div className="flex items-center justify-center md:justify-start">
      <Image
        src="/logos/light_textonly_nobuffer_transparent.png"
        alt="AiPOX"
        width={280}
        height={72}
        className="w-36 md:w-32 h-auto object-contain"
      />
    </div>
  );
}

export default function AppNavbar() {
  const t = useTranslations('nav');
  const tAbout = useTranslations('AboutPage');

  type NavItem = { key: string; href: string; children?: { key: string; href: string; labelKey?: string }[] };
  const links = NAV_LINKS as unknown as NavItem[];

  const labelFor = (key: string) => {
    // Prefer i18n labels from the 'nav' namespace; fallback to raw key when missing.
    // Use explicit mapping to avoid dynamic translation keys which are disallowed by lint rules.
    switch (key) {
      case 'home':
        return t('home');
      case 'products':
        return t('products');
      case 'howIBuild':
        return t('howIBuild');
      case 'about':
        return t('about');
      case 'contact':
        return t('contact');
      default:
        return key;
    }
  };

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpanded = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="w-11/12 mx-auto mt-0">
      {/* Increase navbar vertical size slightly (py-1.5 ~= +2px per side) */}
      <div className="bg-[oklch(var(--background)/0.02)] backdrop-blur-[var(--blur-strength)] rounded-full border border-border/20 px-3 py-2.5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <div className="lg:hidden">
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>  
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="mr-2">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" role="dialog" aria-label="Mobile navigation" className="w-80 bg-[oklch(var(--background)/0.20)] backdrop-blur-xl border-[oklch(var(--border)/0.5)]">
                <SheetTitle className="sr-only">{t('navigation')}</SheetTitle>
                <SheetDescription className="sr-only">{t('mobileNavigationDescription')}</SheetDescription>

                {/* Mobile logo at the top of the sheet */}
                <div className="px-4">
                  <MobileLogo />
                </div>

                <div className="mt-8 space-y-3">
                  {links.map((route) => (
                    <div key={route.key} className="">
                      <div className="flex items-center justify-between px-4 py-3 rounded-md">
                        <Link href={route.href} className="text-base font-medium">
                          {labelFor(route.key)}
                        </Link>

                        {route.children && (
                          <button
                            type="button"
                            aria-expanded={!!expanded[route.key]}
                            onClick={() => toggleExpanded(route.key)}
                            className="p-1 rounded hover:bg-muted/30"
                            aria-label={expanded[route.key] ? 'Collapse submenu' : 'Expand submenu'}
                          >
                            <svg
                              className={`h-4 w-4 transform transition-transform ${expanded[route.key] ? 'rotate-90' : ''}`}
                              viewBox="0 0 20 20"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M6 4L14 10L6 16V4Z" fill="currentColor" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {route.children && expanded[route.key] && (
                        <ul className="pl-6 mt-1 space-y-1">
                          {route.children.map((c) => (
                            <li key={c.key}>
                              <Link href={c.href} className="block text-sm text-muted-foreground hover:text-foreground px-2 py-1 rounded">
                                {c.labelKey ? (tAbout ? tAbout(c.labelKey) : c.labelKey) : c.key}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}

                  <div className="pt-4 border-t border-border/20">
                    <div className="flex items-center gap-2 px-4">
                      <ThemeToggle />
                      <LanguageSwitcher />
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Interactief AiPOX-lettermerk (het thuis van de woordspeling — MB-005).
              Zichtbaar op alle schermmaten; klik = Home, onthulling op hover/tap. */}
          <div className="flex items-center ml-1 md:ml-4">
            <NavLogoAcronym />
          </div>
        </div>

        <div className="hidden lg:block">
          {/* viewport={false} => each dropdown anchors directly under its own
              trigger (via the relative NavigationMenuItem), instead of a shared
              viewport pinned to the left edge of the list. */}
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {links.map((route) => (
                <NavigationMenuItem key={route.key}>
                  {route.children && route.children.length > 0 ? (
                    <>
                      {/* Neutralise the shadcn trigger pill (bg-background/h-10/px-4/
                          text-sm) so this dropdown reads like its sibling links;
                          the inner <Link> supplies the padding, the chevron the
                          affordance. twMerge lets these classes win. */}
                      {/* Trigger is a plain label (valid HTML: a <button>, no
                          nested <a>). It opens the menu on hover/click; the six
                          /about sections live inside the dropdown. Transparent so
                          it reads like its sibling links. */}
                      <NavigationMenuTrigger className="h-auto bg-transparent px-3 py-2 text-base font-normal text-foreground hover:bg-transparent hover:text-foreground focus:bg-transparent focus:text-foreground data-[active]:bg-transparent data-[state=open]:bg-transparent">
                        {labelFor(route.key)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <div className="p-4">
                          <ul className="grid gap-2">
                            {route.children!.map((c) => (
                              <li key={c.key}>
                                <NavigationMenuLink asChild>
                                  <Link href={c.href} className="block px-2 py-1 rounded hover:bg-muted">
                                    {c.labelKey ? (tAbout ? tAbout(c.labelKey) : c.labelKey) : c.key}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link href={route.href} className="px-3 py-2">
                        {labelFor(route.key)}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-2 pr-3">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
      </div>
    </div>
  );
}

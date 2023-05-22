import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';

import { Icons, propsForSVGPresentation } from './icons';

const items = [
  {
    label: 'Mentions-legales',
    href: '/',
  },
  {
    label: 'À propos',
    href: '/',
  },
];

export function SiteHeader() {
  const t = useTranslations('site');
  return (
    <header
      className="sticky top-0 z-[500] w-full border-b bg-background"
      role="banner"
    >
      <div className="flex h-16 items-center space-x-4 px-3 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo
            {...propsForSVGPresentation}
            className="lock hidden h-8 w-8 sm:inline"
          />
          <span className="font-bold ">{t('title')}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav role="navigation" className="flex items-center space-x-1">
            <MainNav items={items} />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Menu } from '@/api/settings';
import { useSettingsContext } from '@/context/settings';
import { useTranslations } from 'next-intl';

import { MainNav } from '@/components/main-nav';
import { ThemeToggle } from '@/components/theme-toggle';

import { Icons, propsForSVGPresentation } from './icons';

type Props = {
  menu?: Menu[] | null;
};

export function SiteHeader({ menu }: Props) {
  const t = useTranslations('site');
  const { settings = null } = useSettingsContext();
  return (
    <header
      className="sticky top-0 z-[500] w-full border-b bg-background"
      role="banner"
    >
      <div className="flex h-16 items-center space-x-4 px-3 sm:justify-between sm:space-x-0">
        <Link href="/" className="flex items-center space-x-2">
          {settings && settings.customization.header?.logo?.src ? (
            <Image
              className="lock hidden size-8 sm:inline"
              width={32}
              height={32}
              {...settings.customization.header.logo}
              alt={settings.customization.header.logo.alt ?? ''}
            />
          ) : (
            <Icons.logo
              {...propsForSVGPresentation}
              className="lock hidden size-8 sm:inline"
            />
          )}
          <span className="font-bold">{t('title')}</span>
        </Link>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav role="navigation" className="flex items-center space-x-1">
            <MainNav menu={menu} />
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

export default function MapMenu() {
  const pathname = usePathname();
  const t = useTranslations('mapMenu');
  //const hash = global.location?.hash ?? '#content';
  const hasContent = pathname.startsWith('/map/');
  const contentLabel = pathname.includes('observation')
    ? t('observation')
    : t('details');
  return (
    <nav className="max-w-4/5 fixed bottom-4 left-1/2 z-[1001] -translate-x-1/2 sm:w-max">
      <ul
        className={cn(
          'flex items-stretch space-x-1 rounded-md bg-background/80 p-1 shadow-lg backdrop-blur-sm md:hidden',
        )}
      >
        <li>
          <Link
            className={cn(
              'flex h-full items-center rounded-sm  px-3 py-1.5 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              // hash === '#search' && 'bg-accent text-accent-foreground',
            )}
            href="#search"
          >
            {t('search')}
          </Link>
        </li>
        {hasContent && (
          <li>
            <Link
              className={cn(
                'flex h-full items-center rounded-sm px-3 py-1.5 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                // hash === '#content' && 'bg-accent text-accent-foreground',
              )}
              href="#content"
            >
              {contentLabel}
            </Link>
          </li>
        )}
        <li>
          <Link
            className={cn(
              'flex h-full items-center rounded-sm  px-3 py-1.5 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              // hash === '#map' && 'bg-accent text-accent-foreground',
            )}
            href="#map"
          >
            {t('map')}
          </Link>
        </li>
      </ul>
    </nav>
  );
}

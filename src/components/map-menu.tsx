'use client';

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
          'flex items-stretch space-x-1 rounded-md bg-background p-1 xl:hidden ',
          !hasContent && 'lg:hidden',
        )}
      >
        <li className="lg:hidden">
          <a
            className={cn(
              'flex h-full items-center rounded-sm  px-3 py-1.5 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              // hash === '#search' && 'bg-accent text-accent-foreground',
            )}
            href="#search"
          >
            {t('search')}
          </a>
        </li>
        {hasContent && (
          <li>
            <a
              className={cn(
                'flex h-full items-center rounded-sm px-3 py-1.5 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                // hash === '#content' && 'bg-accent text-accent-foreground',
              )}
              href="#content"
            >
              {contentLabel}
            </a>
          </li>
        )}
        <li>
          <a
            className={cn(
              'flex h-full items-center rounded-sm  px-3 py-1.5 text-center text-sm font-medium hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
              // hash === '#map' && 'bg-accent text-accent-foreground',
            )}
            href={`#map`}
          >
            {t('map')}
          </a>
        </li>
      </ul>
    </nav>
  );
}

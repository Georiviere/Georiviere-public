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
    <nav className="fixed bottom-4 left-1/2 z-[1000] w-max -translate-x-1/2">
      <ul
        className={cn(
          'flex h-10 items-center space-x-1 rounded-md border bg-background p-1 xl:hidden',
          !hasContent && 'lg:hidden',
        )}
      >
        <li className="lg:hidden">
          <a
            className={cn(
              'rounded-sm px-3 py-1.5 text-sm font-medium focus:bg-accent focus:text-accent-foreground',
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
                'rounded-sm px-3 py-1.5 text-sm font-medium focus:bg-accent focus:text-accent-foreground',
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
              'rounded-sm px-3 py-1.5 text-sm font-medium focus:bg-accent focus:text-accent-foreground',
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

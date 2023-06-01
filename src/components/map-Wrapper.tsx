'use client';

import { HTMLAttributes, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { Icons, propsForSVGPresentation } from './icons';

type Props = HTMLAttributes<HTMLElement>;

export default function MapWrapper({ className, ...props }: Props) {
  const pathName = usePathname();
  const t = useTranslations('map');
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => (
          <div className="grid h-full place-content-center bg-secondary">
            <div className="flex flex-col items-center gap-2">
              <Icons.loading
                className="animate-spin text-primary"
                height={48}
                width={48}
                {...propsForSVGPresentation}
              />
              <span>{t('loading')}</span>
            </div>
          </div>
        ),
        ssr: false,
      }),
    [t],
  );

  return (
    <section
      {...props}
      className={cn(
        'h-full grow',
        className,
        pathName === '/map' && 'xl:w-[calc(100vw*2/3)]',
      )}
    >
      <Map />
    </section>
  );
}

'use client';

import { HTMLAttributes, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

type Props = HTMLAttributes<HTMLElement>;

export default function MapWrapper({ className, ...props }: Props) {
  const pathName = usePathname();
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/map'), {
        loading: () => <span>Loading</span>,
        ssr: false,
      }),
    [],
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

'use client';

import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import MapFilters from './map-filters';
import { ObservationCTA } from './observation-cta';
import SearchForm from './search-form';
import { ScrollArea } from './ui/scroll-area';

type Props = HTMLAttributes<HTMLElement>;

export function MapSidebar({ className, ...props }: Props) {
  return (
    <section {...props} className={cn('flex flex-col bg-primary', className)}>
      <div className="flex flex-row flex-wrap items-end justify-center gap-4 p-4">
        <SearchForm />
        <ObservationCTA />
      </div>
      <ScrollArea className="h-full">
        <MapFilters />
      </ScrollArea>
    </section>
  );
}

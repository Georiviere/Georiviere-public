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
      <div className="flex flex-col items-stretch gap-4 p-4 sm:flex-row sm:items-end">
        <SearchForm />
        <ObservationCTA />
      </div>
      <ScrollArea className="h-full pb-20">
        <MapFilters />
      </ScrollArea>
    </section>
  );
}

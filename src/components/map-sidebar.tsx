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
    <section {...props} className={cn('bg-primary', className)}>
      <ScrollArea className="h-full pb-20">
        <SearchForm />
        <MapFilters />
        <ObservationCTA />
      </ScrollArea>
    </section>
  );
}

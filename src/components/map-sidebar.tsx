'use client';

import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

import MapFilters from './map-filters';
import { ObservationCTA } from './observation-cta';
import SearchForm from './search-form';

type Props = HTMLAttributes<HTMLElement>;

export function MapSidebar({ className, ...props }: Props) {
  return (
    <section {...props} className={cn('bg-primary', className)}>
      <SearchForm />
      <MapFilters />
      <ObservationCTA />
    </section>
  );
}

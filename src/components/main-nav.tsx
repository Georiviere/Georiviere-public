import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface MainNavProps {
  items?: {
    label: string;
    href?: string;
    disabled?: boolean;
    external?: boolean;
  }[];
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex gap-6 md:gap-10">
      {items?.length ? (
        <ul className="flex gap-6">
          {items?.map(
            (item, index) =>
              item.href && (
                <li key={index}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center text-sm font-semibold text-muted-foreground',
                      item.disabled && 'cursor-not-allowed opacity-80',
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
          )}
        </ul>
      ) : null}
    </div>
  );
}

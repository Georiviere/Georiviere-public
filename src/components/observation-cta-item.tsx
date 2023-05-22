'use client';

import React from 'react';

import { cn } from '@/lib/utils';
import { NavigationMenuLink } from '@/components/ui/navigation-menu';

import { Icons } from './icons';

export const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'flex select-none items-center space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className,
          )}
          {...props}
        >
          <span>
            <span className="text-sm font-medium leading-none">{title}</span>
            <span className="line-clamp-2 block text-sm leading-snug text-muted-foreground">
              {children}
            </span>
          </span>
          <Icons.chevronRight />
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';

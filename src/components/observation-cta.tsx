import React from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import { Icons } from './icons';

export function ObservationCTA() {
  const t = useTranslations('observation');
  const params = useSearchParams();
  return (
    <div className="flex justify-center p-4">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>{t('labelButton')}</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="m-auto grid grid-cols-2 gap-2 p-6 md:w-[400px]">
                <ListItem
                  href={`/map/observation/damages?${params.toString()}`}
                  title={t('damages.label')}
                >
                  {t('damages.shortDescription')}
                </ListItem>
                <ListItem
                  href={`/map/observation/fauna-flora?${params.toString()}`}
                  title={t('fauna-flora.label')}
                >
                  {t('fauna-flora.shortDescription')}
                </ListItem>
                <ListItem
                  href={`/map/observation/quantity?${params.toString()}`}
                  title={t('quantity.label')}
                >
                  {t('quantity.shortDescription')}
                </ListItem>
                <ListItem
                  href={`/map/observation/quality?${params.toString()}`}
                  title={t('quality.label')}
                >
                  {t('quality.shortDescription')}
                </ListItem>
                <ListItem
                  href={`/map/observation/landscape?${params.toString()}`}
                  title={t('landscape.label')}
                >
                  {t('landscape.shortDescription')}
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, href, title, children, ...props }, ref) => {
  if (!href) {
    return null;
  }
  return (
    <li>
      <Link
        ref={ref}
        className={cn(
          'flex select-none items-center space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
          className,
        )}
        href={href}
        {...props}
      >
        <span>
          <span className="text-sm font-medium leading-none">{title}</span>
          <span className="line-clamp-2 block text-sm leading-snug text-muted-foreground">
            {children}
          </span>
        </span>
        <Icons.chevronRight className="shrink-0" />
      </Link>
    </li>
  );
});
ListItem.displayName = 'ListItem';

import React from 'react';
import Link from 'next/link';
import { Menu } from '@/api/settings';
import { useTranslations } from 'next-intl';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import { Icons, propsForSVGPresentation } from './icons';
import { Button } from './ui/button';

interface MainNavProps {
  menu?: Menu[] | null;
}

export function MainNav({ menu }: MainNavProps) {
  const t = useTranslations('site');
  if (!menu) {
    return null;
  }
  return (
    <div className="flex gap-6 md:gap-10">
      <div className="lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">
              <Icons.menu {...propsForSVGPresentation} />
              <span className="sr-only">{t('openMenu')}</span>
            </Button>
          </SheetTrigger>
          <SheetContent className="lg:hidden" position="right" size="full">
            <SheetHeader>
              <SheetTitle>{t('menu')}</SheetTitle>
            </SheetHeader>
            <ul>
              {menu.map(
                (item, index) =>
                  item.href && (
                    <li className="my-4" key={index}>
                      <SheetClose asChild>
                        {item.external ? (
                          <a
                            href={item.href}
                            className="flex items-center text-sm font-semibold text-muted-foreground hover:underline focus:underline  "
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {item.title}{' '}
                            <Icons.externalLink
                              height={16}
                              {...propsForSVGPresentation}
                            />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className="flex items-center text-sm font-semibold text-muted-foreground hover:underline focus:underline  "
                          >
                            {item.title}
                          </Link>
                        )}
                      </SheetClose>
                    </li>
                  ),
              )}
            </ul>
          </SheetContent>
        </Sheet>
      </div>
      <ul className="hidden gap-6 lg:flex">
        {menu.map(
          (item, index) =>
            item.href && (
              <li key={index}>
                {item.external ? (
                  <a
                    href={item.href}
                    className="flex items-center text-sm font-semibold text-muted-foreground hover:underline focus:underline  "
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.title}{' '}
                    <Icons.externalLink
                      height={16}
                      {...propsForSVGPresentation}
                    />
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center text-sm font-semibold text-muted-foreground hover:underline focus:underline  "
                  >
                    {item.title}
                  </Link>
                )}
              </li>
            ),
        )}
      </ul>
    </div>
  );
}

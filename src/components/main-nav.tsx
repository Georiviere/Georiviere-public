import React from 'react';
import Link from 'next/link';
import { Menu } from '@/api/settings';

import { Icons, propsForSVGPresentation } from './icons';

interface MainNavProps {
  menu?: Menu[];
}

export function MainNav({ menu }: MainNavProps) {
  if (menu === undefined) {
    return null;
  }
  return (
    <div className="flex gap-6 md:gap-10">
      <ul className="flex gap-6">
        {menu?.map(
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

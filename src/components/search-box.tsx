'use client';

import { useId } from 'react';
import { Label } from '@radix-ui/react-label';
import { useTranslations } from 'next-intl';

import { cn } from '@/lib/utils';

import { Icons, propsForSVGPresentation } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import LinkAsButton from './ui/link-as-button';

type Props = {
  className?: string;
};

export function SearchBox({ className }: Props) {
  const t = useTranslations('searchBox');
  const inputId = useId();
  return (
    <form action="/map" className={cn('p-4', className)}>
      <div className="text-center">
        <Label
          className="text-2xl font-semibold tracking-tight"
          htmlFor={inputId}
        >
          {t('label')}
        </Label>
      </div>
      <div className="my-6 flex w-full items-center space-x-2 rounded-md bg-input">
        <Input className="border-0" id={inputId} name="text" type="search" />
        <Button type="submit" variant="ghost">
          <Icons.search {...propsForSVGPresentation} />
          <span className="sr-only">{t('label')}</span>
        </Button>
      </div>
      <div className="relative my-6 ">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t"></span>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">ou</span>
        </div>
      </div>
      <div className="text-center">
        <LinkAsButton href="/map">
          <Icons.map {...propsForSVGPresentation} className="mr-2" />
          <span>{t('navigate')}</span>
        </LinkAsButton>
      </div>
    </form>
  );
}

'use client';

import { SyntheticEvent, useCallback, useEffect, useId, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { Icons, propsForSVGPresentation } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function SearchForm() {
  const t = useTranslations('map');
  const inputId = useId();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const inputElement = useRef<HTMLInputElement>(null);

  const handleSubmit = useCallback(
    (event: SyntheticEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formdata = new FormData(event.currentTarget);
      const params = new URLSearchParams(searchParams);
      params.delete('text');
      if (formdata.has('text') && formdata.get('text') !== '') {
        params.set('text', formdata.get('text') as string);
      }
      router.push(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!params.has('text') && inputElement.current !== null) {
      inputElement.current.value = '';
    }
  }, [searchParams]);

  return (
    <form action="/map" className="p-4" onSubmit={handleSubmit}>
      <Label htmlFor={inputId}>{t('label')}</Label>
      <div className="flex w-full items-center space-x-2 rounded-md bg-input">
        <Input
          className="border-0"
          id={inputId}
          name="text"
          type="search"
          ref={inputElement}
          defaultValue={new URLSearchParams(searchParams)
            .get('text')
            ?.toString()}
        />
        <Button type="submit" variant="ghost">
          <Icons.filter {...propsForSVGPresentation} />
          <span className="sr-only">{t('label')}</span>
        </Button>
      </div>
    </form>
  );
}

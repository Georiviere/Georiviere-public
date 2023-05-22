import { useId } from 'react';
import { useTranslations } from 'next-intl';

import { Icons, propsForSVGPresentation } from './icons';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export default function SearchForm() {
  const t = useTranslations('map');
  const inputId = useId();
  return (
    <form action="/map" className="p-4">
      <Label htmlFor={inputId} className="sr-only">
        {t('label')}
      </Label>
      <div className="flex w-full items-center space-x-2 rounded-md bg-input">
        <Input className="border-0" id={inputId} name="text" type="search" />
        <Button type="submit" variant="ghost">
          <Icons.search {...propsForSVGPresentation} />
          <span className="sr-only">{t('label')}</span>
        </Button>
      </div>
    </form>
  );
}

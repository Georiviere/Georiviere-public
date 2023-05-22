'use client';

import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import useHasMounted from '@/hooks/useHasMounted';
import { Button } from '@/components/ui/button';
import { Icons, propsForSVGPresentation } from '@/components/icons';

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const t = useTranslations('theme');
  const otherTheme = theme === 'light' ? 'dark' : 'light';
  const hasMounted = useHasMounted();

  return (
    <Button variant="ghost" size="sm" onClick={() => setTheme(otherTheme)}>
      <Icons.sun
        {...propsForSVGPresentation}
        className="rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
      />
      <Icons.moon
        {...propsForSVGPresentation}
        className="absolute rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
      />
      {hasMounted && (
        <span className="sr-only">{t('toggle', { theme: t(otherTheme) })}</span>
      )}
    </Button>
  );
}

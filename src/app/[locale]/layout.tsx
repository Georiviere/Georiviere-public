import { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { getSettings } from '@/api/fullsettings';
import { getMenuSettings } from '@/api/settings';
import { SettingsContextProvider } from '@/context/settings';
import { NextIntlClientProvider, useLocale } from 'next-intl';
import { getTranslations } from 'next-intl/server';

import { fontSans } from '@/lib/fonts';
import { cn } from '@/lib/utils';
import ErrorMessage from '@/components/error-message';
import { SiteHeader } from '@/components/site-header';
import { ThemeProvider } from '@/components/theme-provider';

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export const generateMetadata = async () => {
  const t = await getTranslations('site');

  return {
    title: {
      default: t('title'),
      template: `%s - ${t('title')}`,
    },
    description: t('description'),
    themeColor: [
      { media: '(prefers-color-scheme: light)', color: 'white' },
      { media: '(prefers-color-scheme: dark)', color: 'black' },
    ],
    icons: {
      icon: '/medias/favicon.png',
      shortcut: '/medias/favicon-16x16.png',
      apple: '/medias/apple-touch-icon.png',
    },
  };
};

export default async function PageLayout({ children, params }: Props) {
  const locale = useLocale();

  let messages;
  try {
    messages = (await import(`../../../translations/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  // Show a 404 error if the user requests an unknown locale
  if (params.locale !== locale) {
    notFound();
  }

  let settings = null;
  let menu = null;
  let error = null;

  try {
    settings = await getSettings();
    menu = await getMenuSettings();
  } catch (err) {
    // Throw error in layout.tsx does not invoke error.tsx
    // https://nextjs.org/docs/app/building-your-application/routing/error-handling
    error = err as Error;
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable,
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <SettingsContextProvider settings={settings}>
              <div className="relative flex h-screen flex-col">
                <SiteHeader menu={menu} />
                <div className="flex h-full min-h-0 flex-col">
                  {error !== null && (
                    <ErrorMessage
                      title={messages.observation.error.title}
                      message={error?.message}
                    />
                  )}
                  {error === null && children}
                </div>
              </div>
            </SettingsContextProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

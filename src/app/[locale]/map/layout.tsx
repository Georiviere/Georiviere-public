import { ReactNode } from 'react';
import { getMapSettings } from '@/api/settings';
import { MapContextProvider } from '@/context/map';
import { getTranslations } from 'next-intl/server';

import MapWrapper from '@/components/map-Wrapper';
import MapMenu from '@/components/map-menu';
import { MapSidebar } from '@/components/map-sidebar';

type Props = {
  children: ReactNode;
};

export const generateMetadata = async () => {
  const t = await getTranslations('map');

  return {
    title: t('title'),
  };
};

export default async function MapLayout({ children }: Props) {
  const settings = await getMapSettings();
  return (
    <MapContextProvider defaultSettings={settings}>
      <main
        role="main"
        className="grid h-full w-screen grid-cols-[1fr_1fr_1fr] grid-rows-1 justify-stretch overflow-x-hidden scroll-smooth"
      >
        <MapSidebar
          id="search"
          className="z-10 w-screen lg:sticky lg:left-0 lg:w-[50vw] xl:w-[calc(100vw/3)]"
        />
        <section
          id="content"
          className="h-full w-screen pb-20 empty:hidden lg:w-[50vw] lg:scroll-ml-[50vw] xl:w-[calc(100vw/3)] xl:pb-0"
        >
          {children}
        </section>
        <MapWrapper
          id="map"
          className="w-screen lg:w-[50vw] xl:w-[calc(100vw/3)]"
        />
        <MapMenu />
      </main>
    </MapContextProvider>
  );
}

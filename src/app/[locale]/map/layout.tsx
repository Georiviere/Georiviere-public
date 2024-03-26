import { ReactNode } from 'react';
import { Settings, getMapSettings } from '@/api/settings';
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
  let settings = null;

  try {
    settings = (await getMapSettings()) as Settings['map'];
  } catch (error) {
    throw error;
  }

  return (
    <MapContextProvider defaultSettings={settings}>
      <main
        role="main"
        className="grid h-full w-screen grid-cols-[100dvw_auto_100dvw] grid-rows-1 justify-stretch overflow-x-hidden scroll-smooth md:grid-cols-[300px_auto_1fr]"
      >
        <MapSidebar id="search" className="z-[1001]" />
        <section
          id="content"
          className="h-full w-[100dvw] empty:w-0 md:w-[350px] lg:w-[450px]"
        >
          {children}
        </section>
        <MapWrapper id="map" />
        <MapMenu />
      </main>
    </MapContextProvider>
  );
}

import { getPois } from '@/api/poi';

import HomeUI from '@/components/home-page';

export default async function Home() {
  const pois = await getPois();

  return <HomeUI pois={pois} />;
}

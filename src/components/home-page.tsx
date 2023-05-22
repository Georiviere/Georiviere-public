import Image from 'next/image';
import { Poi } from '@/api/poi';
import { useTranslations } from 'next-intl';

import Introduction from '@/components/introduction';
import SiteFooter from '@/components/site-footer';
import SuggestionListMap from '@/components/suggestion-list-map';
import SuggestionListObservation from '@/components/suggestion-list-observation';
import SuggestionListPois from '@/components/suggestion-list-pois';

type Props = {
  pois: Poi[];
};

export default function HomeUI({ pois }: Props) {
  const t = useTranslations('home');
  return (
    <>
      <main role="main">
        <div className="relative">
          <h1 className="top absolute inset-2/4 w-full origin-top-left -translate-x-2/4 px-10 text-center text-lg font-bold text-white shadow lg:text-2xl">
            {t('title')}
          </h1>
          <Image
            alt=""
            className="max-h-96 w-full object-cover object-center"
            height={580}
            priority
            src="/home.jpg"
            width={1500}
          />
        </div>
        <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          <div>
            <Introduction className="my-8" />
            <SuggestionListMap className="my-8" />
            <SuggestionListObservation className="my-8" />
            <SuggestionListPois pois={pois} className="my-8" />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

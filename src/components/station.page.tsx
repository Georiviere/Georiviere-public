import { Observation } from '@/api/customObservations';
import { LatLngTuple } from 'leaflet';
import { useTranslations } from 'next-intl';

import ButtonCenterView from './button-center-view';
import ButtonClose from './button-close';
import { StationContributionList } from './station-contribution-list';

type Props = {
  content: {
    description: string;
    label: string;
    geometry: {
      type: 'Point';
      coordinates: [number, number];
    };
    customContributionTypes?: number[];
  };
  observationTypes: Observation[];
};

export default function StationPageUI({ content, observationTypes }: Props) {
  const t = useTranslations('details');
  return (
    <article>
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          {content.label}
        </h1>
        <div className="absolute right-0 top-0 z-10 flex rounded-bl-lg border border-t-0 bg-background">
          {content.geometry && (
            <ButtonCenterView
              latLng={content.geometry.coordinates.reverse() as LatLngTuple}
            />
          )}
          <ButtonClose />
        </div>
      </header>

      <div className="mt-4">
        {content.description.split('\n').map(e => (
          <p>{e}</p>
        ))}
      </div>
      <StationContributionList
        ids={content.customContributionTypes || []}
        types={observationTypes}
      />
      <h2 className="text-l mt-8 font-extrabold">{t('observations')} :</h2>
      <ul>
        <li>Test</li>
      </ul>
    </article>
  );
}

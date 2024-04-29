import { Observation } from '@/api/customObservations';
import { Station } from '@/api/stations';
import { LatLngTuple } from 'leaflet';

import ButtonCenterView from './button-center-view';
import ButtonClose from './button-close';
import { StationContributionList } from './station-contribution-list';
import { StationContributionTypesList } from './station-contribution-types-list';

type Props = {
  content: Station;
  observationTypes: Observation[];
};

export default function StationPageUI({ content, observationTypes }: Props) {
  const observations = content.observations ?? [];

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
      <StationContributionTypesList
        ids={content.customContributionTypes || []}
        types={observationTypes}
      />
      <StationContributionList
        types={observationTypes}
        observations={observations}
      />
    </article>
  );
}

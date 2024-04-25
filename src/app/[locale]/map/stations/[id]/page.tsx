import { notFound } from 'next/navigation';
import { getObservation } from '@/api/customObservations';
import { getDetails } from '@/api/details';

import StationPageUI from '@/components/station.page';

type Props = {
  params: {
    station: string;
    id: number;
  };
};

export default async function StationsPage({ params: { id } }: Props) {
  const content = await getDetails('stations', id);
  const observationTypes = await Promise.all(
    content.customContributionTypes?.map((id: string) => getObservation(id)),
  );
  if (content === null) {
    notFound();
  }
  return (
    <StationPageUI content={content} observationTypes={observationTypes} />
  );
}

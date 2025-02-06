import { notFound } from 'next/navigation';
import { getObservationDetails as getCustomObservationDetails } from '@/api/customObservations';
import { getObservationDetails } from '@/api/observations';
import { DEFAULT_OBSERVATION_TYPES } from '@/constants';

import LegacyObservationDetails from '@/components/legacy-observation-details';
import ObservationDetailsPageUI from '@/components/observation.page';

type Props = {
  params: {
    path: string;
    id: number;
  };
};

export default async function DetailsPage({ params: { path, id } }: Props) {
  let content = null;
  if (DEFAULT_OBSERVATION_TYPES.includes(path)) {
    content = await getObservationDetails(`${id}`);
    if (content !== null) {
      return <LegacyObservationDetails content={content} />;
    }
  } else {
    content = await getCustomObservationDetails(path, `${id}`);
  }
  if (content === null) {
    notFound();
  }
  return <ObservationDetailsPageUI content={content} />;
}

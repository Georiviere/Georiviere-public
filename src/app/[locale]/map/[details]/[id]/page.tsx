import { notFound } from 'next/navigation';
import { getDetails } from '@/api/details';

import DetailsPageUI from '@/components/details.page';

type Props = {
  params: {
    details: string;
    id: number;
  };
};

export default async function DetailsPage({ params: { details, id } }: Props) {
  const content = await getDetails(details, id);
  if (content === null) {
    notFound();
  }
  return <DetailsPageUI content={content} />;
}

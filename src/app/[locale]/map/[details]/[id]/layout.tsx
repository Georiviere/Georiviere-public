import { ReactNode } from 'react';
import { getDetails } from '@/api/details';
import { getTranslations } from 'next-intl/server';

import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  children: ReactNode;
};

type GenerateMetaDataProps = {
  params: {
    details: string;
    id: number;
  };
};

export const generateMetadata = async ({
  params: { details, id },
}: GenerateMetaDataProps) => {
  const t = await getTranslations('site');
  const content = await getDetails(details, id);
  if (content === null) {
    return;
  }
  return {
    title: `${content.name} - ${t('title')}`,
    description: content.description,
  };
};

export default function DetailsLayout({ children }: Props) {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 lg:p-8">{children}</div>
    </ScrollArea>
  );
}

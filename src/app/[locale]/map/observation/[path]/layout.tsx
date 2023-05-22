import { ReactNode } from 'react';
import { getTranslations } from 'next-intl/server';

import { ScrollArea } from '@/components/ui/scroll-area';

type Props = {
  children: ReactNode;
};

type generateMetadataProps = {
  params: { path: string };
};

export const generateMetadata = async ({
  params: { path },
}: generateMetadataProps) => {
  const t = await getTranslations('observation');

  return {
    title: `${t('title')} ${t(`${path}.label`)}`,
  };
};

export default function ObservationLayout({ children }: Props) {
  return (
    <ScrollArea className="h-full">
      <div className="p-4 lg:p-8">{children}</div>
    </ScrollArea>
  );
}

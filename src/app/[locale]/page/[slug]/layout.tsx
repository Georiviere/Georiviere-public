import { ReactNode } from 'react';
import { getPage } from '@/api/page';
import { getTranslations } from 'next-intl/server';

import SiteFooter from '@/components/site-footer';

type Props = {
  children: ReactNode;
};

type GenerateMetaDataProps = {
  params: {
    slug: string;
  };
};

export const generateMetadata = async ({
  params: { slug },
}: GenerateMetaDataProps) => {
  const content = await getPage(slug);
  if (content === null) {
    return;
  }
  return {
    title: `${content.title}`,
  };
};

export default function DetailsLayout({ children }: Props) {
  return (
    <>
      <main role="main">
        <div className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
          {children}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

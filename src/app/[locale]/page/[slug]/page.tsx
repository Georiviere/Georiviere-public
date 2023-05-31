import { notFound } from 'next/navigation';
import { getPage } from '@/api/page';

import SiteFooter from '@/components/site-footer';

type Props = {
  params: {
    slug: string;
  };
};

export default async function FlatPage({ params: { slug } }: Props) {
  const content = await getPage(slug);
  if (content === null) {
    notFound();
  }
  return (
    <>
      <h1 className="text-lg font-bold lg:text-2xl">{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.content }} />
    </>
  );
}

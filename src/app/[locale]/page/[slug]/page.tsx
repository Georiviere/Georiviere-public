import { notFound } from 'next/navigation';
import { getPage } from '@/api/page';

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
      <div
        className="is-WYSIWYG after:clear-both after:table after:content-['']"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </>
  );
}

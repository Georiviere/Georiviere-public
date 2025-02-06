import { convertAttachementsToImages } from '@/lib/utils';

import ButtonClose from './button-close';
import Carousel from './carousel';

type LegacyObservationDetailsProps = {
  content: {
    attachments?: any[];
    type: string;
    category: string;
    description: string;
  };
};

export default function LegacyObservationDetails({
  content,
}: LegacyObservationDetailsProps) {
  return (
    <article>
      {content.attachments && content.attachments?.length > 0 && (
        <div className="-m-8 mb-6">
          <Carousel
            className="w-full"
            images={convertAttachementsToImages(content.attachments)}
            width={800}
            height={600}
          />
        </div>
      )}
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight lg:text-3xl">
          {content.type} - {content.category}
        </h1>
        <div className="absolute right-0 top-0 z-10 flex rounded-bl-lg border border-t-0 bg-background">
          <ButtonClose />
        </div>
      </header>
      <div className="mt-4">{content.description}</div>
    </article>
  );
}

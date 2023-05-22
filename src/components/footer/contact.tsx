import { Fragment } from 'react';

import { Icons, propsForSVGPresentation } from '../icons';

type Props = {
  className?: string;
};

const informations = [
  {
    name: 'Parc naturel régional du Haut-Jura',
    location: [['29 Le Village', '39310 LAJOUX']],
    phone: ['03 84 34 12 30'],
    email: ['parc@parc-haut-jura.fr'],
  },
];

export default function Contact({ className }: Props) {
  if (informations.length === 0) {
    return null;
  }
  return (
    <>
      {informations.map(item => (
        <address className="p-0 not-italic">
          <h3 className="text-2xl font-bold tracking-tight">{item.name}</h3>
          {item.location.length > 0 && (
            <div className="my-3 flex gap-2">
              <Icons.mail {...propsForSVGPresentation} />
              <div>
                {item.location.map((location, index) => (
                  <p className="mb-3" key={index}>
                    {location.map((item, itemIndex) => (
                      <Fragment key={itemIndex}>
                        {itemIndex !== 0 && <br />}
                        {item}
                      </Fragment>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          )}
          {item.phone.length > 0 && (
            <p className="my-3 flex gap-2">
              <Icons.phone {...propsForSVGPresentation} />
              {item.phone.map((phone, index) => (
                <Fragment key={index}>
                  {index !== 0 && ' - '}
                  <a
                    className="hover:underline focus:underline"
                    href={`tel:${phone}`}
                  >
                    {phone}
                  </a>
                </Fragment>
              ))}
            </p>
          )}
          {item.email.length > 0 && (
            <p className="my-3 flex gap-2">
              <Icons.atSign {...propsForSVGPresentation} />
              {item.email.map((email, index) => (
                <Fragment key={index}>
                  {index !== 0 && ' - '}
                  <a
                    className="hover:underline focus:underline"
                    href={`mailto:${email}`}
                  >
                    {email}
                  </a>
                </Fragment>
              ))}
            </p>
          )}
        </address>
      ))}
    </>
  );
}

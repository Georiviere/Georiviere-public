import { JSONSchema } from 'json-schema-yup-transformer/dist/schema';

export type PostObservationProps = {
  geom?: string;
  properties: string;
  files?: string;
};

export type Observation = {
  id: number;
  label: string;
  description: string;
  json_schema_form: JSONSchema;
  stations: number[];
};

async function fetchObservations(): Promise<Observation[]> {
  const res = await fetch(
    `${process.env.apiHost}/api/portal/fr/${process.env.portal}/custom-contribution-types/`,
    {
      next: { revalidate: 60 * 60 },
      headers: {
        Accept: 'application/json',
      },
    },
  );
  if (res.status < 200 || res.status > 299) {
    return [];
  }
  return res.json();
}

async function fetchObservation(id: string): Promise<Observation | null> {
  const res = await fetch(
    `${process.env.apiHost}/api/portal/fr/${process.env.portal}/custom-contribution-types/${id}`,
    {
      next: { revalidate: 60 * 60 },
      headers: {
        Accept: 'application/json',
      },
    },
  );
  if (res.status < 200 || res.status > 299) {
    return null;
  }
  return res.json();
}

async function postObservation(props: any, id: string) {
  // const { files, properties, geom } = props;
  // const decodedFiles = await Promise.all(
  //   JSON.parse(files).map(async (item: { name: string; file: string }) => {
  //     return {
  //       name: item.name,
  //       file: await fetch(item.file).then(res => res.blob()),
  //     };
  //   }),
  // );

  // const body = new FormData();

  // body.append('properties', properties);
  // body.append('geom', geom);

  // decodedFiles.map((item, index) => {
  //   body.append(`file${index + 1}`, item.file, item.name);
  // });

  // console.log('>> content to send >>>>', body);

  try {
    const res = await fetch(
      `${process.env.apiHost}/api/portal/fr/${process.env.portal}/custom-contribution-types/${id}/contributions/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(props),
      },
    ).catch(errorServer => {
      throw Error(errorServer);
    });
    if (res.status > 499) {
      throw Error(res.statusText);
    }
    const json = await res.json();

    if (res.status < 200 || res.status > 299) {
      const errors = Object.values(json)
        .map(err => (Array.isArray(err) ? err[0] : err))
        .join('. ');
      return { error: true, message: errors };
    }
    return { error: false, message: json };
  } catch (error) {
    let message = 'Unknown Error';
    if (error instanceof Error) message = error.message;
    return { error: true, message };
  }
}

export async function getObservation(id: string) {
  const observation = await fetchObservation(id);
  return {
    ...observation,
    json_schema_form: {
      ...observation?.json_schema_form,
      properties: {
        ...observation?.json_schema_form?.properties,
      },
    },
  };
}

export async function getObservations() {
  const observations = await fetchObservations();
  return observations;
}

export async function handleSubmitObservation(
  body: PostObservationProps,
  id: string,
) {
  return postObservation(body, id);
}

export type PostObservationProps = {
  geom?: string;
  properties: string;
  files?: string;
};

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

export async function handleSubmitCustomObservation(
  body: PostObservationProps,
  id: string,
) {
  'use server';
  return await postObservation(body, id);
}

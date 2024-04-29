export type PostObservationProps = {
  geom?: string;
  properties: string;
  files?: string;
};

async function postObservation(
  props: { [key: string]: string | Blob },
  id: string,
  formData: FormData,
) {
  const body = new FormData();

  Object.entries(props).forEach(([key, value]) => {
    body.append(key, value);
  });

  Array.from({ length: 5 }).forEach((_, index) => {
    const number = index + 1;
    const file = formData.get(`file${number}-file`) as File;
    const category = formData.get(`file${number}-category`);
    if (file && file.size > 0 && category) {
      body.append(`file${number}`, file);
      body.append(`file${number}-category`, category);
    }
  });

  try {
    const res = await fetch(
      `${process.env.apiHost}/api/portal/fr/${process.env.portal}/custom-contribution-types/${id}/contributions/`,
      {
        method: 'POST',
        body,
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
  formData: FormData,
) {
  'use server';
  return await postObservation(body, id, formData);
}

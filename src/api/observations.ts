import {
  JSONSchema,
  JSONSchemaType,
} from 'json-schema-yup-transformer/dist/schema';

import { getCorrespondingPath } from '@/lib/utils';

async function fetchObservation() {
  const res = await fetch(
    `${process.env.apiHost}/api/portal/fr/${process.env.portal}/contributions/json_schema/`,
    {
      next: { revalidate: 60 * 60 },
    },
  );
  if (res.status < 200 || res.status > 299) {
    return {};
  }
  return res.json();
}

async function postObservation(body: Record<string, string>) {
  try {
    const res = await fetch(
      `${process.env.apiHost}/api/portal/fr/${process.env.portal}/contributions/`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(body),
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

function observationAdapter(json: JSONSchema, path: string) {
  const { category, ...jsonProperties } = json.properties;
  const { then: type } = json.allOf.find(
    (item: JSONSchemaType) =>
      item.if.properties.category?.const === getCorrespondingPath(path),
  );
  return {
    ...json,
    properties: {
      lng: {
        type: 'number',
        title: 'Longitude',
        minimum: -180,
        maximum: 180,
      },
      lat: {
        type: 'number',
        title: 'Latitude',
        minimum: -90,
        maximum: 90,
      },
      ...jsonProperties,
      ...type.properties,
    },
    required: [...json.required, 'lng', 'lat'].filter(
      item => item !== 'category',
    ),
  };
}

export async function getObservationJsonSchema(path: string) {
  const rawObservation = await fetchObservation();
  return observationAdapter(rawObservation, path);
}

export async function handleSubmitObservation(body: Record<string, string>) {
  'use server';
  return postObservation(body);
}

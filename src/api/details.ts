import { Settings, getMapSettings } from './settings';

async function fetchDetails(url: string) {
  const res = await fetch(`${process.env.apiHost}${url}`, {
    next: { revalidate: 60 * 60 },
  });
  if (res.status < 200 || res.status > 299) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getDetails(path: string, id: number) {
  let settings = null;
  try {
    settings = (await getMapSettings()) as Settings['map'];
  } catch (error) {
    // notfound
    return null;
  }
  const { url: endpoint } =
    settings.layersTree
      .flatMap(({ layers }) => layers)
      .find(item => item.type === path) ?? {};
  if (endpoint === undefined) {
    return null;
  }
  let details = null;
  try {
    details = await fetchDetails(`${endpoint}${id}`);
  } catch (e) {
    // notfound
  }
  return details;
}

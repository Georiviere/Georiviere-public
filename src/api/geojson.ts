import { GeoJSON } from 'geojson';

async function fetchGeoJSON(url: string) {
  const res = await fetch(`${process.env.apiHost}${url}`, {
    next: { revalidate: 60 * 60 },
  });
  if (res.status < 200 || res.status > 299) {
    return {};
  }
  return res.json();
}

export function getGeoJSON(url: string): Promise<GeoJSON> {
  return fetchGeoJSON(url);
}

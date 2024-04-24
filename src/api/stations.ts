export type Station = {
  id: number;
  code: string;
  label: string;
  description: string;
  customContributionTypes: number[];
  geometry: {
    category: {
      type: string;
      coordinates: number[];
    };
  };
};

async function fetchStations(): Promise<Station[]> {
  const url = `${process.env.apiHost}/api/portal/fr/${process.env.portal}/stations/`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 60 * 60 },
  });
  if (res.status < 200 || res.status > 299) {
    return [];
  }
  return res.json();
}

async function fetchStation(id: number): Promise<Station | null> {
  const url = `${process.env.apiHost}/api/portal/fr/${process.env.portal}/stations/${id}`;
  const res = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
    next: { revalidate: 60 * 60 },
  });
  if (res.status < 200 || res.status > 299) {
    return null;
  }
  return res.json();
}

export async function getStations() {
  const stations = await fetchStations();
  return stations;
}

export async function getStation(id: number) {
  const station = await fetchStation(id);
  return station;
}

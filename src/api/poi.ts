export type Poi = {
  id: number;
  name: string;
  description: string;
  attachments?: {
    thumbnail: string;
  }[];
  type: {
    category: {
      id: number;
    };
  };
};

async function fetchPois(): Promise<Poi[]> {
  const res = await fetch(
    `${process.env.apiHost}/api/portal/fr/${process.env.portal}/pois/`,
    {
      next: { revalidate: 60 * 60 },
    },
  );
  if (res.status < 200 || res.status > 299) {
    return [];
  }
  return res.json();
}

export async function getPois() {
  const pois = fetchPois();
  // TODO filter results via API
  return (await pois)
    .sort((a, b) => b.id - a.id)
    .filter(item => item.type.category.id === 2)
    .slice(0, 4);
}

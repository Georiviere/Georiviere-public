import { GeoJSON } from 'geojson';
import { GeoJSONOptions, LatLngBoundsExpression } from 'leaflet';
import slugify from 'slugify';

import { getGeoJSON } from './geojson';

type BaseLayers = {
  id: number;
  label: string;
  url: string;
  attribution: string;
}[];

export type Layers = {
  id: number;
  label: string;
  defaultActive: boolean;
  options: GeoJSONOptions;
  geojson?: GeoJSON;
  geojsonUrl: string;
  url: string;
  type: string;
}[];

type LayersTree = {
  label: string;
  layers: Layers;
}[];

type RawMenu = {
  title: string;
  url: string;
  order: number;
  hidden: boolean;
};
export type Menu = {
  title: string;
  href: string;
  external: boolean;
  url: string;
  order: number;
  hidden: boolean;
};

type RawSettings = {
  map: {
    baseLayers: BaseLayers;
    group: LayersTree;
    bounds: [number, number, number, number];
  };
  flatpages: RawMenu[];
};

export type Settings = {
  map: {
    container: {
      bounds: LatLngBoundsExpression;
    };
    layersTree: LayersTree;
    baseLayers: BaseLayers;
  };
  flatpages: RawMenu[];
};

async function fetchSettings(): Promise<RawSettings> {
  const res = await fetch(
    `${process.env.apiHost}/api/portal/fr/portal/${process.env.portal}/`,
    {
      next: { revalidate: 60 * 60 },
    },
  );
  if (res.status < 200 || res.status > 299) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
}

export async function getSettings(): Promise<Settings> {
  const {
    map: {
      baseLayers,
      group,
      bounds: [lat1, lng1, lat2, lng2],
    },
    ...settings
  } = await fetchSettings();
  return {
    ...settings,
    map: {
      baseLayers,
      layersTree: group,
      container: {
        bounds: [
          [lng1, lat1],
          [lng2, lat2],
        ],
      },
    },
  };
}

export async function getMapSettings(): Promise<Settings['map']> {
  const { map } = await getSettings();
  const layersTree = await Promise.all(
    map.layersTree.map(async item => ({
      ...item,
      layers: await Promise.all(
        item.layers.map(async layer => {
          if (layer.defaultActive === false) {
            return layer;
          }
          return { ...layer, geojson: await getGeoJSON(layer.geojsonUrl) };
        }),
      ),
    })),
  );
  return {
    ...map,
    layersTree,
  };
}

export async function getMenuSettings(): Promise<Menu[]> {
  const { flatpages } = await getSettings();
  return flatpages
    .filter(({ hidden }) => !hidden)
    .map(item => {
      if (item.url.startsWith('/api/')) {
        return {
          ...item,
          external: false,
          href: `page/${slugify(item.title, { lower: true })}`,
        };
      }
      return {
        ...item,
        external: true,
        href: item.url,
      };
    });
}

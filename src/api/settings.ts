import { ImageProps } from 'next/image';
import { FeatureCollection } from 'geojson';
import { GeoJSONOptions, LatLngBoundsExpression } from 'leaflet';
import slugify from 'slugify';

import { getGeoJSON } from './geojson';
import { getLocalettings } from './localSettings';

export type Attachement = { thumbnail: string; url: string; title: string };

type BaseLayers = {
  id: number;
  label: string;
  url: string;
  attribution: string;
}[];

export type RawLayer = {
  id: number;
  label: string;
  defaultActive: boolean;
  options: GeoJSONOptions;
  geojsonUrl: string;
  url: string;
  type: string;
};

export type Layer = {
  id: number;
  label: string;
  defaultActive?: boolean;
  isActive: boolean;
  options: GeoJSONOptions;
  geojson?: FeatureCollection;
  geojsonUrl: string;
  url: string;
  type: string;
};

type LayersTree = {
  label: string;
  layers: RawLayer[];
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

export type Suggestion = {
  title: string;
  subtitle?: string;
  content?: {
    label: string;
    description: string;
    images?: Attachement[];
    href: string;
  }[];
};

type LocaleSettingsFooter = {
  informations?: {
    name: string;
    location: string[][];
    phone: string[];
    email: string[];
  }[];
  links?: {
    label: string;
    url: string;
  }[];
  socialNetworks?: {
    label: string;
    url: string;
    icon: string;
  }[];
  partners?: {
    src: string;
    label: string;
    url: string;
  }[];
};

export type RawLocalSettings = {
  header?: {
    logo: ImageProps;
  };
  footer?: LocaleSettingsFooter;
  homepage?: {
    welcomeBanner?: {
      images?: Attachement[];
      shouldDisplayText?: boolean;
    };
    introduction?: {
      title?: string;
      content?: string;
      images?: Attachement[];
    };
    suggestions?: (Suggestion & {
      type: 'static' | 'observation' | 'action';
    })[];
  };
};

export type LocalSettings = {
  header?: {
    logo: ImageProps;
  };
  footer?: LocaleSettingsFooter;
  homepage: {
    welcomeBanner?: {
      images?: Attachement[];
      shouldDisplayText?: boolean;
    };
    introduction?: {
      title?: string;
      content?: string;
      images?: Attachement[];
    };
    suggestions: Suggestion[];
  };
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
  customization: LocalSettings;
};

async function fetchSettings(): Promise<RawSettings> {
  try {
    const res = await fetch(
      `${process.env.apiHost}/api/portal/fr/portal/${process.env.portal}/`,
      {
        next: { revalidate: 60 * 60 },
      },
    ).catch(error => {
      throw error;
    });
    if (res.status < 200 || res.status > 299) {
      throw new Error('Failed to fetch settings');
    }
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSettings(): Promise<Settings | null> {
  let rawSettings = null;
  let customization = null;
  try {
    rawSettings = await fetchSettings();
    customization = await getLocalettings();
  } catch (error) {
    throw error;
  }
  const {
    map: {
      baseLayers,
      group,
      bounds: [lat1, lng1, lat2, lng2],
    },
    flatpages,
    ...settings
  } = rawSettings;
  return {
    customization: {
      ...settings,
      ...customization,
    },
    flatpages,
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

async function getRawMapSettings(): Promise<Settings['map']> {
  const settings = await fetchSettings();
  const {
    map: {
      baseLayers,
      group,
      bounds: [lat1, lng1, lat2, lng2],
    },
  } = settings;

  return {
    baseLayers,
    layersTree: group,
    container: {
      bounds: [
        [lng1, lat1],
        [lng2, lat2],
      ],
    },
  } as Settings['map'];
}

export async function getMapSettings(): Promise<Settings['map'] | []> {
  let map = null;
  try {
    map = await getRawMapSettings();
  } catch (error) {
    throw error;
  }

  if (map === null) {
    return [];
  }

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

export async function getDetailsUrl(path: string): Promise<string> {
  let map = null;
  try {
    map = await getRawMapSettings();
  } catch (error) {
    throw error;
  }

  if (map === null) {
    return '';
  }

  const { url: endpoint = '' } =
    map.layersTree
      .flatMap(({ layers }) => layers)
      .find(item => item.type === path) ?? {};
  return endpoint;
}

export async function getMenuSettings(): Promise<Menu[]> {
  let settings = null;
  try {
    settings = await fetchSettings();
  } catch (e) {
    throw e;
  }
  if (settings === null) {
    return [];
  }
  return settings.flatpages
    .filter(({ hidden }) => !hidden)
    .map(item => {
      if (item.url.startsWith('/api/')) {
        return {
          ...item,
          external: false,
          href: `/page/${slugify(item.title, { lower: true })}`,
        };
      }
      return {
        ...item,
        external: true,
        href: item.url,
      };
    });
}

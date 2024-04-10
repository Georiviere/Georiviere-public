'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { getGeoJSON } from '@/api/geojson';
import { Layer, Settings, getMapSettings } from '@/api/settings';
import { FeatureCollection, Point } from 'geojson';
import { Map } from 'leaflet';

import { getUrlSearchParamsForLayers, partition } from '@/lib/utils';

type MapContextProps = {
  layers: Layer[] | null;
  map: Map | null;
  observationCoordinates: Point | null;
  setObservationCoordinates: React.Dispatch<React.SetStateAction<Point | null>>;
  settings: Settings['map'] | null;
  setLayers: React.Dispatch<React.SetStateAction<Layer[] | null>>;
  setMap: React.Dispatch<React.SetStateAction<Map | null>>;
  toggleLayer: (id: number, isActive: boolean) => void;
};

type MapContextProviderProps = {
  children: React.ReactNode;
};

export const MapContext = createContext<MapContextProps>({
  layers: null,
  map: null,
  observationCoordinates: null,
  setObservationCoordinates: point => point,
  settings: null,
  setLayers: layers => layers,
  setMap: map => map,
  toggleLayer: () => {},
});

export const useMapContext = () => useContext(MapContext);

export const MapContextProvider = ({ children }: MapContextProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const layersFromParams = params.get('layers') ?? '';

  const [defaultSettings, setDefaultSettings] = useState<
    Settings['map'] | null
  >(null);

  useEffect(() => {
    (getMapSettings() as Promise<Settings['map']>).then(settings =>
      setDefaultSettings(settings),
    );
  }, []);

  const settings = useMemo(
    () => defaultSettings?.layersTree.flatMap(group => group.layers) ?? null,
    [defaultSettings],
  );

  const [layers, setLayers] = useState<Layer[] | null>(
    () =>
      settings?.map(item => ({ ...item, isActive: item.defaultActive })) ??
      null,
  );

  useEffect(() => {
    setLayers(settings?.map(item => ({ ...item, isActive: item.defaultActive })) ?? null);
  }, [settings]);

  const [map, setMap] = useState<Map | null>(null);
  const [observationCoordinates, setObservationCoordinates] =
    useState<Point | null>(null);

  const getLayerById = useCallback(
    (id: number): undefined | Layer => layers?.find(layer => layer.id === id),
    [layers],
  );

  const toggleLayer = useCallback(
    async (id: number, isActive: boolean) => {
      const currentLayer = getLayerById(id);
      if (currentLayer === undefined) {
        return;
      }
      if (currentLayer.isActive === isActive) {
        return;
      }

      setLayers(
        prevLayers =>
          prevLayers?.map(layer => {
            if (layer.id === currentLayer.id) {
              return { ...layer, isActive };
            }
            return layer;
          }) ?? [],
      );

      if (currentLayer.geojson) return;

      const geojson =
        currentLayer.geojson ?? (await getGeoJSON(currentLayer.geojsonUrl));

      setLayers(
        prevLayers =>
          prevLayers?.map(layer => {
            if (layer.id === currentLayer.id) {
              return { ...layer, geojson: geojson as FeatureCollection };
            }
            return layer;
          }) ?? [],
      );
    },
    [getLayerById],
  );

  useEffect(() => {
    if (
      layersFromParams === '' &&
      layers?.some(item => 'defaultActive' in item)
    ) {
      const layersID = layers
        .filter(item => item.defaultActive)
        .map(({ id }) => id);
      const nextLayerSearchParams = getUrlSearchParamsForLayers(
        layersFromParams,
        layersID,
        true,
      );
      const text = params.get('text');
      router.replace(
        `${pathname}${nextLayerSearchParams}${
          text ? `&text=${encodeURIComponent(text)}` : ''
        }`,
      );
    }
  }, [layers, layersFromParams, params, pathname, router]);

  useEffect(() => {
    layers?.filter(({ isActive }) => isActive).forEach(async currentLayer => {
      if (!currentLayer.geojson) {
        const geojson = await getGeoJSON(currentLayer.geojsonUrl);
        setLayers(
          prevLayers =>
            prevLayers?.map(layer => {
              if (layer.id === currentLayer.id) {
                return { ...layer, geojson: geojson as FeatureCollection };
              }
              return layer;
            }) ?? [],
        );
      }
    });
  }, [layers]);

  useEffect(() => {
    const textFromParams = params.get('text')
      ? `&text=${params.get('text')}`
      : '';
    const nextLayerSearchParams = `?layers=${layers
      ?.filter(({ isActive }) => isActive)
      .map(({ id }) => id)
      .join(',')}`;
    window.history.pushState(
      null,
      '',
      `${nextLayerSearchParams}${textFromParams}`,
    );
  }, [layers, params]);

  return (
    <MapContext.Provider
      value={{
        layers,
        map,
        observationCoordinates,
        setObservationCoordinates,
        settings: defaultSettings,
        setLayers,
        setMap,
        toggleLayer,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

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
import { Layer, Settings } from '@/api/settings';
import { Point } from 'geojson';
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
  defaultSettings: Settings['map'] | null;
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

export const MapContextProvider = ({
  defaultSettings,
  children,
}: MapContextProviderProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const layersFromParams = params.get('layers') ?? '';

  const settings = useMemo(
    () => defaultSettings?.layersTree.flatMap(group => group.layers) ?? null,
    [defaultSettings?.layersTree],
  );

  const [layers, setLayers] = useState<Layer[] | null>(
    () =>
      settings?.map(item => ({ ...item, isActive: item.defaultActive })) ??
      null,
  );
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
      const geojson =
        currentLayer.geojson ?? (await getGeoJSON(currentLayer.geojsonUrl));
      setLayers(prevLayers => {
        if (prevLayers === null) {
          return prevLayers;
        }

        return prevLayers.reduce((list: Layer[], layer) => {
          const { defaultActive, ...nextLayer } = layer;
          if (nextLayer.id !== id) {
            list.push(nextLayer);
          } else {
            list.push({ ...nextLayer, isActive, geojson });
          }
          return list;
        }, []);
      });
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
    const [activatedLayers, disabledLayers] = partition(layers ?? [], item =>
      layersFromParams.split(',').map(Number).includes(item.id),
    );
    activatedLayers.forEach(item => toggleLayer(item.id, true));
    disabledLayers.forEach(item => toggleLayer(item.id, false));
  }, [layers, layersFromParams, toggleLayer]);

  if (!defaultSettings && !layers) {
    return null;
  }

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

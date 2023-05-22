'use client';

import { createContext, useCallback, useContext, useState } from 'react';
import { getGeoJSON } from '@/api/geojson';
import { Layers, Settings } from '@/api/settings';
import { Point } from 'geojson';
import { Map } from 'leaflet';

type MapContextProps = {
  layers: Layers | null;
  map: Map | null;
  observationCoordinates: Point | null;
  setObservationCoordinates: React.Dispatch<React.SetStateAction<Point | null>>;
  settings: Settings['map'] | null;
  setLayers: React.Dispatch<React.SetStateAction<Layers | null>>;
  setMap: React.Dispatch<React.SetStateAction<Map | null>>;
  toggleLayer: (id: number, isActive: boolean) => void;
};

type MapContextProviderProps = {
  children: React.ReactNode;
  defaultSettings: Settings['map'];
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
  const [observationCoordinates, setObservationCoordinates] =
    useState<Point | null>(null);

  const [layers, setLayers] = useState<Layers | null>(
    defaultSettings?.layersTree.flatMap(group => group.layers) ?? null,
  );

  const [map, setMap] = useState<Map | null>(null);

  const toggleLayer = useCallback(
    async (id: number, isActive: boolean) => {
      const currentLayer = layers?.find(layer => layer.id === id);
      if (currentLayer === undefined) {
        return;
      }
      const geojson =
        currentLayer.geojson ?? (await getGeoJSON(currentLayer.geojsonUrl));
      setLayers(prevLayers => {
        if (prevLayers === null) {
          return prevLayers;
        }

        return prevLayers.reduce((list: Layers, layer) => {
          if (layer.id !== id) {
            list.push(layer);
          } else {
            list.push({ ...layer, defaultActive: isActive, geojson });
          }
          return list;
        }, []);
      });
    },
    [layers],
  );

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

import {
  createContainerComponent,
  createElementHook,
  createPathHook,
} from '@react-leaflet/core';
import { LeafletContextInterface } from '@react-leaflet/core/lib/context';
import { PathOptions, Polyline } from 'leaflet';
// @ts-ignore next-line not TS definitions for this package
import { antPath } from 'leaflet-ant-path';
import { PolylineProps } from 'react-leaflet/lib/Polyline';

export type AntPathOptions = PathOptions & {
  dashArray?: [string, string];
  delay?: number;
  weight?: number;
  pulseColor?: number;
};

interface Props extends PolylineProps {
  options: AntPathOptions;
}

function createAntPath(props: Props, context: LeafletContextInterface) {
  const instance = antPath(props.positions, props.options);
  return { instance, context: { ...context, overlayContainer: instance } };
}

function updateAntPath(instance: Polyline, props: Props, prevProps: Props) {
  if (
    props.positions !== prevProps.positions ||
    props.options !== prevProps.options
  ) {
    instance.setLatLngs(props.positions);
  }
}

const useAntPathElement = createElementHook(createAntPath, updateAntPath);
const useAntPath = createPathHook(useAntPathElement);
const AntPath = createContainerComponent(useAntPath);

export default AntPath;

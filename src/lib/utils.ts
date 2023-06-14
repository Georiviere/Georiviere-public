import { Attachement } from '@/api/settings';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// https://1loc.dev/array/partition-an-array-based-on-a-condition/
export const partition = <T, _>(arr: T[], criteria: (a: T) => boolean): T[][] =>
  arr.reduce(
    (acc: T[][], item) => (acc[criteria(item) ? 0 : 1].push(item), acc),
    [[], []],
  );

// https://1loc.dev/array/get-the-unique-values-of-an-array/
const unique = <T>(arr: T[]): T[] =>
  arr.filter((el, i, array) => array.indexOf(el) === i);

export const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

export const filesToBase64 = (files: File[]) => {
  return Promise.all(
    files
      .filter(file => file.size > 0)
      .map(async file => {
        let base64File;
        try {
          base64File = await toBase64(file);
        } catch (error) {
          base64File = null;
        }
        return { name: file.name, file: base64File };
      }),
  );
};

// TODO API must split contents by category
export const getCorrespondingPath = (path: string) => {
  if (path === 'fauna-flora') {
    return 'Contribution Faune-Flore';
  }
  if (path === 'damages') {
    return 'Contribution Dégâts Potentiels';
  }
  if (path === 'quantity') {
    return 'Contribution Quantité';
  }
  if (path === 'quality') {
    return 'Contribution Qualité';
  }
  return 'Contribution Élément Paysagers';
};

export const getUrlSearchParamsForLayers = (
  layers: string,
  ids: number[],
  isActive: boolean,
) => {
  const currentLayersID = layers.split(',').filter(Boolean).map(Number);
  const nextLayersID = isActive
    ? [...currentLayersID, ...ids]
    : currentLayersID.filter(layerId => !ids.includes(layerId));
  return nextLayersID.length === 0
    ? ''
    : `?layers=${unique(nextLayersID.sort((a, b) => a - b)).join(',')}`;
};

export function convertAttachementsToImages(
  attachments: Attachement[],
  isThumbnail: boolean = false,
) {
  return attachments.map(item => ({
    src: isThumbnail ? item.thumbnail : item.url,
    alt: item.title ?? '',
  }));
}

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

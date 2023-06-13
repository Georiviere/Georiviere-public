import React from 'react';
import {
  AlertCircle,
  ArrowDownRight,
  ArrowLeft,
  AtSign,
  CheckCircle2,
  ChevronRight,
  ChevronsLeftRight,
  Crosshair,
  ExternalLink,
  Eye,
  Filter,
  Info,
  Loader2,
  LucideProps,
  Mail,
  Map,
  MenuSquare,
  Moon,
  Phone,
  Search,
  SunMedium,
  Waves,
  X,
  type Icon as LucideIcon,
} from 'lucide-react';

export type Icon = LucideIcon;

export const propsForSVGPresentation = {
  ['aria-hidden']: true,
  focusable: false,
};

export const Icons = {
  alert: AlertCircle,
  atSign: AtSign,
  arrowDownRight: ArrowDownRight,
  arrowLeft: ArrowLeft,
  check: CheckCircle2,
  chevronRight: ChevronRight,
  chevronsLeftRight: ChevronsLeftRight,
  crosshair: Crosshair,
  externalLink: ExternalLink,
  eye: Eye,
  filter: Filter,
  info: Info,
  loading: Loader2,
  mail: Mail,
  map: Map,
  menu: MenuSquare,
  moon: Moon,
  phone: Phone,
  search: Search,
  sun: SunMedium,
  close: X,
  waves: Waves,
  logo: (props: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 247 247"
      width="247"
      height="247"
      {...props}
    >
      <ellipse
        fill="rgb(92, 200, 246)"
        rx="123.5"
        ry="123.5"
        cx="123.5"
        cy="123.5"
      />
      <path
        fill="rgb(185, 226, 248)"
        d="M91.245,242.806C90.776,241.919,89.936,240.984,88.670,240.000C70.670,226.000,67.670,216.000,64.670,210.000C61.670,204.000,56.670,187.000,76.670,168.000C96.670,149.000,129.463,147.030,136.670,146.000C143.670,145.000,165.670,145.000,166.670,136.000C167.670,127.000,149.670,115.000,135.670,108.000C129.220,104.775,97.670,91.000,84.670,86.000C72.254,81.224,20.612,63.678,16.000,62.112C37.304,25.020,77.338,0.000,123.170,0.000C168.170,0.000,207.582,24.120,229.170,60.126C223.374,62.028,170.342,79.109,164.670,81.000C158.670,83.000,122.670,97.000,122.670,97.000C122.670,97.000,153.943,111.136,159.670,114.000C167.670,118.000,187.670,128.000,184.670,140.000C181.670,152.000,148.670,157.000,143.670,158.000C139.285,158.877,99.670,168.000,97.670,186.000C95.670,204.000,108.670,217.000,120.670,223.000C130.868,228.099,166.670,238.000,166.670,238.000L169.390,238.047C155.110,243.820,139.509,247.000,123.170,247.000C112.121,247.000,101.409,245.546,91.245,242.806Z"
      />
    </svg>
  ),
  mapMarker: ({ width = 36, height = 44, ...props }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 38 46"
      width={width}
      height={height}
      {...props}
    >
      <path
        d="M37 19C37 33 19 45 19 45C19 45 1 33 1 19C1 9.05887 9.05887 1 19 1C28.9411 1 37 9.05887 37 19V19Z"
        stroke="white"
        strokeWidth="2"
        fill="currentColor"
      />
    </svg>
  ),
};

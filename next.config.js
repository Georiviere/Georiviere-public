/** @type {import('next').NextConfig} */

const withNextIntl = require('next-intl/plugin')(
  // This is the default (also the `src` folder is supported out of the box)
  './i18n.ts'
);

const nextConfig = withNextIntl({
  env: {
    apiHost: process.env.NEXT_PUBLIC_API_HOST,
    portal: process.env.NEXT_PUBLIC_PORTAL,
  },
  experimental: {
    appDir: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: '*',
      },
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
});

module.exports = nextConfig;

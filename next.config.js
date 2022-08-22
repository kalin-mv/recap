/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ['en', 'en_US', 'uk_UA'],
    defaultLocale: 'uk_UA',
  },
};

module.exports = nextConfig;

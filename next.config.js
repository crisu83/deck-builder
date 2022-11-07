/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/",
        destination: "/decks",
        permanent: false,
      },
    ];
  },
};

module.exports = nextConfig;

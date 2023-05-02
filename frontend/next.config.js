/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  skipMiddlewareUrlNormalize: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.storage.googleapis.com",
      },
    ],
  },
};

module.exports = nextConfig;

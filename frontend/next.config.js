/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  skipMiddlewareUrlNormalize: true,
}

module.exports = nextConfig

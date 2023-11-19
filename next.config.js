/** @type {import('next').NextConfig} */
const nextConfig = {}


module.exports = nextConfig
// next.config.js

module.exports = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    serverActions: true,
  },
};


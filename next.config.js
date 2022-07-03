/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["firebasestorage.googleapis.com"],
    formats: ["image/webp"],
  },
};

module.exports = nextConfig;

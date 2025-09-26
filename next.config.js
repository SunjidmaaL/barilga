/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['images.unsplash.com', 'img.icons8.com', 'tailwindcss.com'],
  },
}

module.exports = nextConfig

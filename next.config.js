/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['img.icons8.com', 'tailwindcss.com', 'localhost', 'effortless-luck-023aebe70f.strapiapp.com'],
  },
}

module.exports = nextConfig

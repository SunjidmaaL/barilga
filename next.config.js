/** @type {import('next').NextConfig} */
const nextConfig = {
  // Production optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'effortless-luck-023aebe70f.strapiapp.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'effortless-luck-023aebe70f.media.strapiapp.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'img.icons8.com',
      },
      {
        protocol: 'https',
        hostname: 'tailwindcss.com',
      },
    ],
    // Optimize images in production
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60,
  },
  
  // Suppress Node.js deprecation warnings in webpack
  webpack: (config, { isServer }) => {
    // Suppress punycode deprecation warning by excluding it from client bundle
    config.resolve.fallback = {
      ...config.resolve.fallback,
      punycode: false,
    };
    
    // Production optimizations
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Add a rule to handle mp4, mov, and webm files
    config.module.rules.push({
      test: /\.(mp4|mov|webm)$/,
      type: 'asset/resource',
    });

    // Important: return the modified config
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'plate-jade-2024.s3.us-east-2.amazonaws.com',
        port: '',
        pathname: '/website-files/**',
      },
    ],
  },

  async headers() {
    return [
      {
        // Disable caching for all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
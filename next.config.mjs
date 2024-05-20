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
};

export default nextConfig;

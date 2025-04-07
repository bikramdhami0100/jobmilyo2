import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // webpack: (config) => {
  //   config.cache = {
  //     type: 'memory',
  //   };
  //   return config;
  // },
  images:{
    domains:["lh3.googleusercontent.com","res.cloudinary.com"]
  },
  swcMinify: true, // Use SWC for faster minification
  webpack: (config, { isServer }) => {
    // Disable ForkTsCheckerWebpackPlugin for memory savings
    if (isServer) {
      config.plugins = config.plugins.filter(
        (plugin: any) => plugin.constructor.name !== 'ForkTsCheckerWebpackPlugin'
      );
    }
    return config;
  },
};

export default nextConfig;

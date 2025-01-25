import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.cache = {
      type: 'memory',
    };
    return config;
  },
  images:{
    domains:["lh3.googleusercontent.com"]
  }
};

export default nextConfig;

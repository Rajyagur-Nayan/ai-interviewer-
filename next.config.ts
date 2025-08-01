import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  ...nextConfig,
  darkMode: "class", // not 'media'
};

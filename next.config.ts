import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
      },
      {
        protocol: "https",
        hostname: "cdn.tebex.io",
      },
      {
        protocol: "https",
        hostname: "forum.cfx.re",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@base-ui/react",
      "@radix-ui/react-slot",
    ],
  },
};

export default nextConfig;

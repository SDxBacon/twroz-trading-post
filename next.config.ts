import type { NextConfig } from "next";

// added by create cloudflare to enable calling `getCloudflareContext()` in `next dev`
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Google oauth profile images
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/**",
      },
      // Discord oauth profile images
      {
        protocol: "https",
        hostname: "cdn.discordapp.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  // serverExternalPackages: ["jose", "@panva/hkdf"],
};

export default nextConfig;

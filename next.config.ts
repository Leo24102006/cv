import type { NextConfig } from "next";

// Sur GitHub Pages, le site est servi sous /<nom-du-repo>.
// La variable BASE_PATH est fournie par le workflow de déploiement.
const basePath = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export", // génère des fichiers HTML/CSS statiques dans /out
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
};

export default nextConfig;

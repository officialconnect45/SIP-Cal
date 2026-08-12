/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for Hostinger static Next.js hosting (output directory = out)
  output: "export",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;

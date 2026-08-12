/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — Hostinger serves `out/` without a full Next runtime.
  output: "export",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
  // Faster builds when a full compile is needed.
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

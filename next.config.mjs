/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export — Hostinger serves `out/` without a Node process (avoids 503 PORT issues).
  output: "export",
  images: {
    unoptimized: true,
  },
  poweredByHeader: false,
  trailingSlash: false,
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prefer JS config on Hostinger — TS config needs native SWC, which fails on older GLIBC.
  poweredByHeader: false,
  // Avoid Hostinger proxy issues with trailing redirects.
  trailingSlash: false,
};

export default nextConfig;

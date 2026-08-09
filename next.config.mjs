/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prefer JS config on Hostinger — TS config needs native SWC, which fails on older GLIBC.
  poweredByHeader: false,
};

export default nextConfig;

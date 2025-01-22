/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["localhost", "your-supabase-project.supabase.co"],
  },
};

module.exports = nextConfig;

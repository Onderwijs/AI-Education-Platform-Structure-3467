/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Zorgt ervoor dat Next.js geen build errors geeft op TypeScript fouten in legacy bestanden
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
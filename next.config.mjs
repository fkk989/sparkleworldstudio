/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sparkel-world-studio.s3.ap-south-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "easynirman.com",
      },
      {
        protocol: "https",
        hostname: "sparkle-world-studio-production.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

export default nextConfig;

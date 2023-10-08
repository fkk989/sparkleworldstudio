/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      "sparkel-world-studio.s3.ap-south-1.amazonaws.com",
      "easynirman.com",
    ],
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.externals.push({
      "@aws-sdk/signature-v4-multi-region":
        "commonjs @aws-sdk/signature-v4-multi-region",
    });

    return config;
  },
};

module.exports = nextConfig;

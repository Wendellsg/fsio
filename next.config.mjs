/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4pti1cun6ot4.cloudfront.net",
        port: "",
        pathname: "**",
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;

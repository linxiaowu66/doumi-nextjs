/** @type {import('next').NextConfig} */
const nextConfig = {
  modularizeImports: {
    "@mui/material": {
      transform: "@mui/material/{{member}}",
    },
    "@mui/icons-material": {
      transform: "@mui/icons-material/{{member}}",
    },
    "@mui/styles": {
      transform: "@mui/styles/{{member}}",
    },
    // "@mui/lab": {
    //   transform: "@mui/lab/{{member}}",
    // },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "blogimages2016.oss-cn-hangzhou.aliyuncs.com",
        port: "",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

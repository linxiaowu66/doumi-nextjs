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
        hostname: "blogimage.5udou.cn",
        port: "",
      },
    ],
  },
  experimental: {
    serverComponentsExternalPackages: ["typeorm"],
    serverMinification: false, // 不能压缩，一压缩在生产环境下就会报 xx#Aritcles metadata not found，本质原因就是代码被混淆压缩了导致的
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // webpack: {
  //   optimization: {
  //     minimize: false,
  //   },
  // },
};

export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  async redirects() {
    return [
      // {
      //   source: "/((?!maintenance).*)", // Redirect semua halaman KECUALI /maintenance
      //   destination: "/maintenance",
      //   permanent: false, // Gunakan false (307) untuk maintenance sementara
      // },
    ];
  },
};

export default nextConfig;
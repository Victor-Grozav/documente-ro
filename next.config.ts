import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.faranotar.ro" }],
        destination: "https://faranotar.ro/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        // @react-pdf/renderer requires unsafe-eval for PDF generation
        source: "/documente/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: "script-src 'self' 'unsafe-eval' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;



// import createNextIntlPlugin from "next-intl/plugin"

// const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts")

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },
//   experimental: {
//     serverComponentsExternalPackages: ["sharp"],
//   },
//   images: {
//     formats: ["image/webp", "image/avif"],
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "*.r2.dev",
//       },
//       {
//         protocol: "https",
//         hostname: "*.r2.cloudflarestorage.com",
//       },
//       {
//         protocol: "https",
//         hostname: "petbazar.com.pk",
//       },
//       {
//         protocol: "http",
//         hostname: "localhost",
//       },
//     ],
//     unoptimized: true,
//   },
// }

// export default withNextIntl(nextConfig)



import createNextIntlPlugin from "next-intl/plugin"

const withNextIntl = createNextIntlPlugin("./app/i18n/request.ts")

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    formats: ["image/webp", "image/avif"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.r2.dev",
      },
      {
        protocol: "https",
        hostname: "*.r2.cloudflarestorage.com",
      },
      {
        protocol: "https",
        hostname: "petbazar.com.pk",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    unoptimized: true,
  },
  experimental: {
    // Renamed from serverComponentsExternalPackages to serverExternalPackages
    serverExternalPackages: ["sharp"],
  },
}

export default withNextIntl(nextConfig)

/* eslint-disable unicorn/prefer-module */

module.exports = {
  eslint: {
    dirs: ['pages', 'frontend', 'backend'], // Only run ESLint on the 'pages', 'frontend' and 'backend' directories during production builds (next build)
  },
  env: {
    ROOT: __dirname,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  },
  pageExtensions: ['page.tsx', 'page.ts'],
  images: {
    domains: ['avatars.githubusercontent.com'],
  },
  experimental: {
    externalDir: true,
  },
  output: 'standalone',
}

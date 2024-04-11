const removeImports = require("next-remove-imports")({});
// const i18n = require("./next-i18next.config");

/** @type {import('next').NextConfig} */
const nextConfig = removeImports({
  reactStrictMode: true,
  images: {
    domains: ["ipfs.io", "cdn.sforum.vn"],
  },
  // i18n: i18n.i18n,
  output: "standalone",
});

module.exports = nextConfig;

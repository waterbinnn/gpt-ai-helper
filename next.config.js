/** @type {import('next').NextConfig} */
quire("path");

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src/styles")],
  },
};

module.exports = nextConfig;


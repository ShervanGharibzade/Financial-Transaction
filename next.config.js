// next.config.js
const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
});

const nextConfig = {
  // any other Next.js config
};

module.exports = withPWA(nextConfig);

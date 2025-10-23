const withPWA = require('next-pwa')({
  dest: 'public', // Où sera généré le service worker
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development', // pas de SW en dev
});

module.exports = withPWA({
  reactStrictMode: true,
});

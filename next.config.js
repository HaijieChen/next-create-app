/** @type {import('next').NextConfig} */
// const nextConfig = {};

// module.exports = nextConfig;

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://localhost:8080/api/:path*', // 将请求路径中的 '/api' 替换为空字符串
      },
    ];
  },
};

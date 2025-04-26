/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@freobus/wallet'],
  async rewrites() {
    return [
      {
        source: '/wallet/:path*',
        destination: '/wallet/:path*',
      },
      {
        source: '/api/wallet/:path*',
        destination: '/api/wallet/:path*',
      }
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },
  env: {
    NEXT_PUBLIC_WALLET_ENABLED: process.env.NEXT_PUBLIC_WALLET_ENABLED || 'true',
    NEXT_PUBLIC_WALLET_PROVIDER: process.env.NEXT_PUBLIC_WALLET_PROVIDER || 'metamask',
    NEXT_PUBLIC_DEFAULT_CHAIN_ID: process.env.NEXT_PUBLIC_DEFAULT_CHAIN_ID || '1337',
  }
};

module.exports = nextConfig; 
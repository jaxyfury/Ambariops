/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'placehold.co',
                port: '',
                pathname: '/**',
            },
            {
                protocol: 'https',
                hostname: 'avatar.vercel.sh',
                port: '',
                pathname: '/**',
            }
        ],
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src')
        return config
    },
    env: {
        NEXT_PUBLIC_AUTH_API_URL: process.env.NEXT_PUBLIC_AUTH_API_URL || 'http://localhost:3002/api',
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3004/api/v1',
        NEXT_PUBLIC_ADMIN_URL: process.env.NEXT_PUBLIC_ADMIN_URL || 'http://localhost:3003',
        NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000',
    }
};

module.exports = nextConfig;

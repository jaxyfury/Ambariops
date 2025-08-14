
/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
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
    env: {
        NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
        NEXT_PUBLIC_HOME_URL: process.env.NEXT_PUBLIC_HOME_URL,
    },
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src')
        return config
    },
    async rewrites() {
        const webUrl = process.env.NEXT_PUBLIC_WEB_URL || 'http://localhost:3000';
        return [
            {
                source: '/api/:path*',
                destination: `${webUrl}/api/:path*`,
            },
        ]
    }
};

module.exports = nextConfig;

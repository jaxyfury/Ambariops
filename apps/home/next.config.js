
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
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src')
        return config
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'http://localhost:3000/api/:path*',
            },
        ]
    }
};

module.exports = nextConfig;

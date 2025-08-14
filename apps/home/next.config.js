
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
        // This is the key to fixing the CORS issue. It tells Next.js to proxy
        // any request from the frontend that starts with /api/ to the web app's backend.
        const webUrl = 'http://localhost:3000';
        return [
            {
                source: '/api/:path*',
                destination: `${webUrl}/api/:path*`,
            },
        ]
    }
};

module.exports = nextConfig;

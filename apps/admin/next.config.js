/** @type {import('next').NextConfig} */
const path = require('path')

const nextConfig = {
    transpilePackages: ['@amberops/ui', '@amberops/api', '@amberops/design-tokens', '@amberops/lib'],
    webpack: (config) => {
        config.resolve.alias['@'] = path.resolve(__dirname, 'src')
        return config
    },
    env: {
        NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/v1',
    }
};

module.exports = nextConfig;

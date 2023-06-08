/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        apiKey: process.env.puvlicApiKey || '',
        authDomain: process.env.FIREBASE_AUTH_HOST || '',
        projectId: process.env.projectId || '',
    },
}

module.exports = nextConfig

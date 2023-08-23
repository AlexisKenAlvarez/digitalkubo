/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['lh3.googleusercontent.com', 'res.cloudinary.com'],
    remotePatterns: [
        {
            hostname: "*.googleusercontent.com",
        },
    ]
},
}

module.exports = nextConfig

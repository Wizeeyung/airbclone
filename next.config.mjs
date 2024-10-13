/** @type {import('next').NextConfig} */
const nextConfig = {
  images:{
    domains: [
      "res.cloudinary.com"
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ]
  }, 

  eslint:{
    ignoreDuringBuilds: true,
  }

};





export default nextConfig;

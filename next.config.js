/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents: true
    },
    images:{
        remotePatterns:[
            {
                hostname: 'res.cloudinary.com',
                protocol: 'https',
            }
        ]
    }
}

module.exports = nextConfig

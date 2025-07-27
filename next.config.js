/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@distube/ytdl-core', 'fluent-ffmpeg']
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push('@distube/ytdl-core', 'fluent-ffmpeg');
    }
    return config;
  },
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
    responseLimit: '100mb',
  }
}

module.exports = nextConfig 
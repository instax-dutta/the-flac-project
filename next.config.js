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
  }
}

module.exports = nextConfig 
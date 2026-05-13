/** @type {import('next').NextConfig} */
const nextConfig = {
  // Webpack configuration to prevent module issues
  webpack: (config, { isServer }) => {
    // Fix for webpack module resolution issues (client-side only)
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Output configuration for better deployment
  output: 'standalone',
};

export default nextConfig;

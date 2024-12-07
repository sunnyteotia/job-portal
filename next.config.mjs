/** @type {import('next').NextConfig} */
const nextConfig = {
    exports :{
        async redirects() {
          return [
            {
              source: '/_not-found',
              destination: '/404',
              permanent: false,
            },
          ];
        },
      }
};

export default nextConfig;

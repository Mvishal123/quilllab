/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'uoccrciiudoraptrgxzz.supabase.co',
              port: '',
              pathname: '/dashboard/**',
            },
          ],
    }
};

export default nextConfig;

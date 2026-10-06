/** @type {import('next').NextConfig} */
const nextConfig = {
  // Standalone output bundles only what's needed to run the app.
  // This is required for deployment on any non-Vercel host.
  output: "standalone",

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "plus.unsplash.com" },
      // Supabase storage for uploaded images
      { protocol: "https", hostname: "*.supabase.co" },
    ],
    // Required on shared hosts that don't run the Next.js image optimiser
    // Remove this line if the host supports it (VPS / Vercel)
    unoptimized: true,
  },
};

export default nextConfig;

import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name.ar} | ${siteConfig.name.en}`,
    short_name: siteConfig.name.ar,
    description: siteConfig.tagline.ar,
    start_url: '/ar',
    display: 'standalone',
    background_color: '#080808',
    theme_color: '#080808',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/images/logo.webp',
        sizes: '192x192',
        type: 'image/webp',
      },
      {
        src: '/images/logo.webp',
        sizes: '512x512',
        type: 'image/webp',
      },
    ],
  };
}


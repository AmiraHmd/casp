import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Casp Education',
    short_name: 'Casp Edu',
    description: 'Casp Education is an online learning platform offering high-quality Arabic education and professional courses.',
    start_url: '/',
    display: 'standalone',
    background_color: '#020617',
    theme_color: '#F47920',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}

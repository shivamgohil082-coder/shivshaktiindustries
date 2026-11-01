import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Shiv Shakti Industries',
    short_name: 'Shiv Shakti',
    description:
      'CNC turning, CNC milling, VMC machining, conventional machining, machining assemblies, sheet metal fabrication, machining of connectors and couplings, valves, flanges, bearings, lugs, Bushes and Sleeves, precision component, and many more...',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#aa0000',
    icons: [
      {
        src: '/icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: '/icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}

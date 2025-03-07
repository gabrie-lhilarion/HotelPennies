import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  build: {
    outDir: "../api/dist", // Output directory relative to the Vite root (storefront directory)
    emptyOutDir: true, // Ensures that the output directory is cleaned before each build
  },
  //uncommentbase before build
  // base: "/dist/",
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        "name": "Hotels, Short lets & other services made easy",
        "short_name": "HotelPennies",
        "start_url": "/api",
        "display": "standalone",
        "background_color": "#3367D6",
        "lang": "en",
        "scope": "/api",
        "icons": [
          {
            "src": "/icons/android-chrome-192x192.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "/icons/android-chrome-512x512.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ],
        "theme_color": "#3367D6",
        "shortcuts": [
          {
            "name": "Where do you want to go for vacation",
            "short_name": "Today",
            "description": "Book hotels and short lets for vacation",
            "url": "/",
            "icons": [
              {
                "src": "/images/today.png",
                "sizes": "192x192",
                "type": "image/png"
              }
            ]
          }
        ],
        "description": "Book hotels, short lets, and other services easily with HotelPennies.",
        "screenshots": [
          {
            "src": "/images/screenshot1.png",
            "type": "image/png",
            "sizes": "540x720",
            "form_factor": "narrow"
          },
          {
            "src": "/images/screenshot2.jpg",
            "type": "image/jpeg",
            "sizes": "720x540",
            "form_factor": "wide"
          }
        ]
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image',
            handler: 'CacheFirst',
            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
              },
            },
          },
        ],
      },
    }),
  ],
});

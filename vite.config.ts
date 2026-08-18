import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/flight-academy/',
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon-180x180.png', 'flight-academy-icon.svg'],
      manifest: {
        name: 'Flight Academy',
        short_name: 'Flight Academy',
        lang: 'es-CO',
        description: 'Entrenamiento práctico de Microsoft Flight Simulator 2024.',
        theme_color: '#102b2b',
        background_color: '#f4f5f2',
        display: 'standalone',
        start_url: '/flight-academy/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
    }),
  ],
})

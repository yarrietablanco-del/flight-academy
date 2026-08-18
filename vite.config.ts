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
      manifest: {
        name: 'Flight Academy',
        short_name: 'Flight Academy',
        description: 'Entrenamiento práctico de Microsoft Flight Simulator 2024.',
        theme_color: '#102b2b',
        background_color: '#f4f5f2',
        display: 'standalone',
        start_url: '/flight-academy/',
        icons: [{ src: '/flight-academy/favicon.svg', sizes: 'any', type: 'image/svg+xml', purpose: 'any' }],
      },
    }),
  ],
})

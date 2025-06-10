import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  server: {
    host: true, // یا host: '0.0.0.0'
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'apple-touch-icon.png'],
      manifest: {
        name: 'Wine Tracker',
        short_name: 'WineApp',
        description: 'Track your homemade wine',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          { "src": "/favicon.ico", "type": "image/x-icon", "sizes": "16x16 32x32" },
          { "src": "/icon-192.png", "type": "image/png", "sizes": "192x192" },
          { "src": "/icon-512.png", "type": "image/png", "sizes": "512x512" },
          { "src": "/icon-192-maskable.png", "type": "image/png", "sizes": "192x192", "purpose": "maskable" },
          { "src": "/icon-512-maskable.png", "type": "image/png", "sizes": "512x512", "purpose": "maskable" }
        ]
      }
    })
  ]
})

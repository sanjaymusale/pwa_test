import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    // manifest: {
    //   name: 'my-pwa-app',
    //   short_name: 'my-pwa-app',
    //   description: 'my-pwa-app',
    //   theme_color: '#ffffff',
    // },
    manifest: {
      "name": "my-pwa-app",
      "short_name": "my-pwa-app",
      description: 'my-pwa-app',
      "start_url": "/",
      "scope": "/",
      "display": "standalone",
      "background_color": "#ffffff",
      "theme_color": "#4CAF50",
      "icons": [
          {
            "src": "pwa.png",
            "sizes": "192x192",
            "type": "image/png"
          },
          {
            "src": "pwa.png",
            "sizes": "512x512",
            "type": "image/png"
          }
        ]
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
})
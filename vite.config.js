import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiPlugin } from './vite-plugin-api.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), apiPlugin()],
  publicDir: 'public',
  build: {
    assetsInlineLimit: 0, // Don't inline images, always use file paths
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep the public folder structure in the build
          if (assetInfo.name && assetInfo.name.includes('images/')) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
})

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json'

export default defineConfig({
  plugins: [
    react(),
    crx({ manifest }),
  ],
  define: {
    'process.env.GOOGLE_PLACES_API_KEY': JSON.stringify('AIzaSyD1I3MQdhdUepi7qD5LUYYhpBc8oBJBgSk')
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
})

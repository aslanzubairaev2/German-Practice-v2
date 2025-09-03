import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Changed from 3000 to 5000
        changeOrigin: true,
        secure: false,
      }
    }
  },
  // Add base path for Vercel deployment
  base: '/',
  // Configure build output directory
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  }
})
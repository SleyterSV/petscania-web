import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/__api': {
        target: 'https://dr-ia-backend.onrender.com',
        changeOrigin: true,
        secure: true,
        rewrite: (p) => p.replace(/^\/__api/, '')
      }
    }
  }
})

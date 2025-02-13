import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fedration from "@originjs/vite-plugin-federation";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    fedration({
      name: 'mailClient',
      filename: 'remoteEntry.js',
      exposes: {
        './email': './src/App',
      },
      shared: ['react', 'react-dom', 'react-router-dom']
    })
  ],
  resolve:{
    alias: {
      '@src': '/src',
      '@components': '/src/components',
      '@pages': '/src/pages',
      '@assets':'/src/assets'
    }
  },
  server:{
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build:{
    target:'esnext',
    minify:true,
    emptyOutDir:true
  }
})

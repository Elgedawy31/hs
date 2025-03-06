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
      '@assets':'/src/assets',
      '@contexts':'/src/contexts',
      '@store':'/src/store',
      '@utils':'/src/utils',
      '@hooks':'/src/hooks',
    }
  },
  server:{
      port: 3131,
  },
  build:{
    target:'esnext',
    minify:true,
    emptyOutDir:true
  }
})

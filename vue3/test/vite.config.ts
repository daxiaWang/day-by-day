import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: './',
  server: {
    port: 4004,
    open: true,
    cors: true,

    proxy: {
      '/ge-submit': {
        target: 'http://192.168.112.119:8089',
        changeOrigin: true,
      },
    },
  },
})

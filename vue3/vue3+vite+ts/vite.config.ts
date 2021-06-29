import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve } from 'path'
console.log('process', process)
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: './',
  css: {
    // 引用全局 scss
    preprocessorOptions: {
      scss: {
        additionalData: `@import './src/style/index.scss';`,
      },
    },
  },
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/zh-cn', 'axios'],
  },
  // server: {
  //   port: 4004,
  //   open: true,
  //   cors: true,

  //   proxy: {
  //     '/example': {
  //       target: 'https://easy-mock.bookset.io',
  //       changeOrigin: true,
  //     },
  //   },
  // },
})

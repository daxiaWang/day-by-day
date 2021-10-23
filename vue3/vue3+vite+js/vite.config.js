import path, { resolve } from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '~': resolve(__dirname, './'),
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.js', '.ts', '.jsx', '.json', '.vue']
  },
  plugins: [
    vue(),
    vueJsx(),
  ],
  css: {
    preprocessorOptions: {
      //define global scss variable
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
  optimizeDeps: {
    include: ['element-plus/lib/locale/lang/zh-cn', 'element-plus/lib/locale/lang/en']
  }
})

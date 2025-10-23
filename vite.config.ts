import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'

export default defineConfig({
  plugins: [solid()],
  base: "/kalyanbomzhh",
  build: {
    // Добавь эти настройки
    cssCodeSplit: true,
    minify: false // временно отключи минификацию для дебага
  },
  css: {
    devSourcemap: true // включи sourcemaps для CSS
  }
})
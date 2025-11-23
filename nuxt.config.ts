export default defineNuxtConfig({
  typescript: {
    strict: true
  },
  vite: {
    ssr: {
      noExternal: ['naive-ui', 'vueuc']
    }
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {}
    }
  }
})

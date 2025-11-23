export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      API_BASE: process.env.API_BASE
    }
  },
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

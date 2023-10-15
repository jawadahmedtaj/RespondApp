// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  modules: [
    'vuetify-nuxt-module', 'nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'
  ],
  build: {
    transpile: ['@vuepic/vue-datepicker']
  },
  devtools: { enabled: true },
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    },
    vuetifyOptions: {
      directives: true
    }
  },
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    'vuetify-nuxt-module', 'nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', '@vee-validate/nuxt'
  ],
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

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@invictus.codes/nuxt-vuetify', 'nuxt-icon', '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt'
  ],
  devtools: { enabled: true },
  vuetify: {
    /* vuetify options */
    vuetifyOptions: {
      // @TODO: list all vuetify options
    },

    moduleOptions: {
      /* nuxt-vuetify module options */
      treeshaking: true | false,
      useIconCDN: true | false,

      /* vite-plugin-vuetify options */
      styles: true | 'none' | 'expose' | 'sass',
      autoImport: true | false,
      useVuetifyLabs: true | false,
    }
  }
})

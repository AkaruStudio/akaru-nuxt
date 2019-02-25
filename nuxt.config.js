module.exports = {
  debug: true,
  /*
  ** Dev server configuration
  */
  server: {
    port: 3000,
    host: '0.0.0.0'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: 'akaru-nuxt',
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: 'Nuxt template by Akaru Studio' },
      /*
      ** OG share properties
      */
      { property: 'og:site_name', content: 'My project' },
      { hid: 'og:title', property: 'og:title', content: 'My project' },
      { hid: 'og:url', property: 'og:url', content: 'http://www.my-project.fr' },
      { hid: 'og:image', property: 'og:image', content: 'http://www.my-project.fr/share.jpg' },
      { hid: 'og:description', property: 'og:description', content: 'Nuxt template by Akaru Studio' },
      { property: 'og:locale', content: 'fr_FR' },
      /*
      ** Twitter share properties
      */
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@my_project' },
      { name: 'twitter:creator', content: '@Akaru_studio' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  modules: [],
  build: {
    /*
    ** Add all commons packages
    */
    vendor: [],
    extend(config, { isDev, isClient }) {
      /*
      ** Run ESLint on save
      */
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: true
          }
        })
      }

      /*
      ** process shader files
      */
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        use: ['raw-loader'],
        exclude: /node_modules/
      })

      /*
      ** SVG plugin
      */
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/
      config.module.rules.push({
        test: /\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [
              { cleanupIDs: false }
            ]
          }
        }
      })
    }
  }
}

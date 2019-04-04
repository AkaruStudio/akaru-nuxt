const path = require('path')
const fs = require('fs')
var zipFolder = require('zip-folder')

// all deploy configs per environment
const PER_DEPLOY_ENV_CONFIGS = {
  base: {
    baseRouter: '/',
    server: {
      port: 3000,
      host: '0.0.0.0'
    }
  },
  preprod: {
    baseRouter: '/my-project/',
    server: {
      host: 'http://clients.akaru.fr/my-project'
    }
  },
  prod: {
    baseRouter: '/',
    server: {
      host: 'http://my-project.fr'
    }
  }
}

// get deploy environment
const deployEnvironment = process.env.DEPLOY_ENV || 'base'
const isPreprod = deployEnvironment === 'preprod'
const isProd = deployEnvironment === 'prod'

// get zip option
let zip = false
process.argv.forEach(function (val) {
  if (val === '--zip') zip = true
})

// get deploy environment config
const deployEnvironementConfig = PER_DEPLOY_ENV_CONFIGS[deployEnvironment]

/**
 * Metas
 */
const title = 'Akaru Nuxt template'
const description = 'Nuxt template by Akaru Studio'
const url = `${deployEnvironementConfig.server.host}${(deployEnvironementConfig.server.port) ? ':' + deployEnvironementConfig.server.port : ''}`

let config = {
  debug: true,
  /*
  ** Dev server configuration
  */
  server: deployEnvironementConfig.server,
  /*
  ** Environnment variables
  */
  env: {
    URL: url
  },
  /*
  ** Metas of the page
  */
  head: {
    title,
    htmlAttrs: {
      lang: 'fr'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=0' },
      { 'http-equiv': 'x-ua-compatible', content: 'ie=edge' },
      { hid: 'description', name: 'description', content: description },
      /*
      ** OG share properties
      */
      { property: 'og:site_name', content: title },
      { hid: 'og:title', property: 'og:title', content: title },
      { hid: 'og:url', property: 'og:url', content: url },
      { hid: 'og:image', property: 'og:image', content: `${url}/share.jpg` },
      { hid: 'og:description', property: 'og:description', content: description },
      { hid: 'og:locale', property: 'og:locale', content: 'fr_FR' },
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
  ** Update router config
  */
  router: {
    base: deployEnvironementConfig.baseRouter
  },
  /*
  ** Customize the progress bar color
  */
  loading: false,
  /*
  ** Build configuration
  */
  modules: [],
  plugins: [{
    src: '~/plugins/EventBus.js',
    ssr: false
  }],
  /*
  ** Nuxt hooks
  */
  hooks: {
    generate: {
      /*
      ** Create zip after generation
      */
      done () {
        if (!zip) return

        const date = new Date()
        const padLeft = number => number < 10 ? `0${number}` : number
        const outputZip = {
          filename: `${date.getFullYear()}-${padLeft(date.getMonth() + 1)}-${padLeft(date.getDate())}_${padLeft(date.getHours())}:${padLeft(date.getMinutes())}.zip`,
          folder: path.join('./zips')
        }
        outputZip.path = path.join(outputZip.folder, outputZip.filename)

        if (!fs.existsSync(outputZip.folder)) {
          fs.mkdirSync(outputZip.folder)
        }

        zipFolder(path.resolve('./dist'), outputZip.path, function (err) {
          if(err) {
            console.log('Error ziping dist', err)
          } else {
            console.log('Dist folder zipped to ' + outputZip.path)
          }
        })
      }
    }
  },
  build: {
    /*
    ** Add all commons packages
    */
    vendor: [],
    extend (config, { isDev, isClient }) {
      /*
      ** Run ESLint on save
      */
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/,
          options: {
            fix: isDev,
            configFile: (true) ? path.resolve('./.eslintrc.js') : path.resolve('./.eslintrc.prod.js')
          },
        })
      }

      /*
      ** Add better devtool config
      ** https://webpack.js.org/configuration/devtool/
      */
      if (isDev) {
        config.devtool = 'cheap-module-eval-source-map'
      }

      /*
      ** Process shader files
      */
      config.module.rules.push({
        test: /\.(glsl|frag|vert)$/,
        use: ['raw-loader'],
        exclude: /node_modules/
      })

      /*
      ** SVG plugin
      */

      // remove SVG extension from existing rule
      const svgRule = config.module.rules.find(rule => rule.test.test('.svg'))
      svgRule.test = /\.(png|jpe?g|gif|webp)$/

      // svg files ending by '_clean.svg' will not be cleaned
      config.module.rules.push({
        test: /_clean\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: false
        }
      })

      // all others SVG files are cleaned
      config.module.rules.push({
        test: /\.svg$/,
        exclude: /_clean\.svg$/,
        loader: 'vue-svg-loader',
        options: {
          svgo: {
            plugins: [{
              cleanupAttrs: true,
            }, {
              removeDoctype: true,
            }, {
              removeXMLProcInst: true,
            }, {
              removeComments: true,
            }, {
              removeMetadata: true,
            }, {
              removeTitle: true,
            }, {
              removeDesc: true,
            }, {
              removeUselessDefs: true,
            }, {
              removeEditorsNSData: true,
            }, {
              removeEmptyAttrs: true,
            }, {
              removeHiddenElems: true,
            }, {
              removeEmptyText: true,
            }, {
              removeEmptyContainers: true,
            }, {
              removeViewBox: false,
            }, {
              removeStyleElement: true
            }, {
              cleanUpEnableBackground: true,
            }, {
              convertStyleToAttrs: true,
            }, {
              convertColors: true,
            }, {
              convertPathData: true,
            }, {
              convertTransform: true,
            }, {
              removeUnknownsAndDefaults: true,
            }, {
              removeNonInheritableGroupAttrs: true,
            }, {
              removeUselessStrokeAndFill: true,
            }, {
              removeUnusedNS: true,
            }, {
              cleanupIDs: true,
            }, {
              inlineStyles: true
            }, {
              cleanupNumericValues: true,
            }, {
              moveElemsAttrsToGroup: true,
            }, {
              moveGroupAttrsToElems: true,
            }, {
              collapseGroups: true,
            }, {
              removeRasterImages: false,
            }, {
              mergePaths: true,
            }, {
              convertShapeToPath: true,
            }, {
              sortAttrs: true,
            }, {
              transformsWithOnePath: false,
            }, {
              removeDimensions: true,
            }, {
              removeAttrs: { attrs: '(stroke|fill)' },
            }]
          }
        }
      })

      /*
      ** Add more aliases
      */
      config.resolve.alias = Object.assign({}, config.resolve.alias, {
        components: path.resolve('./components'),
        mixins: path.resolve('./mixins'),
        plugins: path.resolve('./plugins'),
        store: path.resolve('./store')
      })
    }
  },
  css: ['@/assets/styles/index.styl']
}

/*
** Sitemap
*/
if (isProd || isPreprod) {
  config.modules.push('@nuxtjs/sitemap')
  config.sitemap = {
    path: '/sitemap.xml',
    hostname: url,
    generate: true,
    // additional routes
    routes: () => []
  }
}


module.exports = config

const baseConfig = require('./nuxt.config')

/**
 * Sitemap
 */
baseConfig.modules.push('@nuxtjs/sitemap')
baseConfig.sitemap = {
  path: '/sitemap.xml',
  hostname: 'my-project.fr',
  generate: true,
  // additional routes
  routes: () => []
}

module.exports = baseConfig

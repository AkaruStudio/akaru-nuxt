const baseConfig = require('./nuxt.config')

/**
 * Sitemap
 */
baseConfig.modules.push('@nuxtjs/sitemap')
baseConfig.sitemap = {
  path: '/sitemap.xml',
  hostname: 'clients.akaru.fr/my-project',
  generate: true,
  // additional routes
  routes: () => []
}

module.exports = baseConfig

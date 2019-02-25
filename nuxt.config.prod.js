module.exports = Object.assign({}, require('./nuxt.config'), {
  debug: false,
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'my-project.fr',
    generate: true,
    // additional routes
    routes: () => []
  }
})

module.exports = Object.assign({}, require('./nuxt.config'), {
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'my-project.fr',
    generate: true,
    // additional routes
    routes: () => []
  },
})

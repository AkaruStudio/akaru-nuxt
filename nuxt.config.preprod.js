module.exports = Object.assign({}, require('./nuxt.config'), {
  sitemap: {
    path: '/sitemap.xml',
    hostname: 'clients.akaru.fr/my-project',
    generate: true,
    // additional routes
    routes: () => []
  },
})

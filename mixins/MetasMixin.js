export default {
  head () {
    let title = this.metas && this.metas.title
    let description = this.metas && this.metas.description
    let url = this.metas && this.metas.url || process.env.URL + this.$route.fullPath
    let image = this.metas && this.metas.image

    let metas = {}

    // title
    if (title) {
      if (!metas.meta) metas.meta = []

      // document title
      metas.title = title

      // og title
      metas.meta.push({
        hid: 'og:title',
        property: 'og:title',
        content: title
      })
    }

    // description
    if (description) {
      if (!metas.meta) metas.meta = []

      // document description
      metas.meta.push({
        hid: 'description',
        name: 'description',
        content: description
      })

      // og description
      metas.meta.push({
        hid: 'og:description',
        name: 'og:description',
        content: description
      })
    }

    if (image) {
      if (!metas.meta) metas.meta = []

      // og image
      metas.meta.push({
        hid: 'og:image',
        name: 'og:image',
        content: image
      })
    }

    if (!metas.meta) metas.meta = []

    metas.meta.push({
      hid: 'og:url',
      property: 'og:url',
      content: url
    })

    return metas
  }
}

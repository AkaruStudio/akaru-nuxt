<template>
  <div
    class="imageComponent"
    :class="{
      observe: lazyloadType === 'intersection',
      loading: lazyload
    }"
    :style="{background: background}">
    <img
      ref="image"
      class="image"
      :src="!lazyload && source"
      :data-src="lazyload && source"
      :alt="alt"
      :style="{objectFit: placement}">
  </div>
</template>

<script>
import IntersectionObserverMixin from 'mixins/IntersectionObserverMixin'

export default {
  mixins: [IntersectionObserverMixin],
  props: {
    source: {
      type: String,
      required: true,
      default: () => 'http://placecorgi.com/260/180'
    },
    alt: {
      type: String,
      required: true,
      default: () => 'Image non disponible'
    },
    placement: {
      type: String,
      required: false,
      default: () => 'cover',
      validator: (value) => ['contain', 'cover', 'initial'].indexOf(value) > -1
    },
    background: {
      type: String,
      required: false,
      default: () => 'none'
    },
    lazyload: {
      type: Boolean,
      required: false,
      default: false
    },
    lazyloadType: {
      type: String,
      required: false,
      default: 'direct',
      validator: (value) => ['direct', 'intersection', 'called'].indexOf(value) > -1
    }
  },
  mounted () {
    if (this.lazyload && this.lazyloadType === 'direct') {
      this.lazyloadImage()
    }
  },
  methods: {
    lazyloadImage () {
      const img = new Image()

      img.onload = () => {
        this.$refs.image.src = this.source
        this.$el.classList.remove('loading')
        this.$el.classList.add('loaded')

        this.observer.unobserve(this.$el)
      }

      img.src = this.source
    },
    onIntersect () {
      this.lazyloadImage()
    }
  }
}
</script>

<style lang="stylus" scoped>
  .imageComponent
    position relative
    height 100%
    width 100%
    overflow hidden
    transition opacity 0.3s

    &.loading
      opacity 0

    &.loaded
      opacity 1

  .image
    width 100%
    height 100%
    object-fit cover
    user-select none
</style>

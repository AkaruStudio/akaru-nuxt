<template>
  <div
    class="imageComponent loading"
    :class="{
      'observe-once': lazyloadType === 'intersection'
    }"
    :style="{background: background}">
    <img
      ref="image"
      class="image"
      :src="!lazyload && source"
      :data-src="lazyload && source"
      :alt="alt"
      :style="{
        objectFit: placement,
        objectPosition: position
      }">
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
      validator: (value) => ['contain', 'cover', 'none'].indexOf(value) > -1
    },
    position: {
      type: String,
      required: false,
      default: () => 'center'
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
  data () {
    return {
      loaded: false
    }
  },
  mounted () {
    if (this.lazyload && this.lazyloadType === 'direct') {
      this.lazyloadImage()
    }

    if (this.$refs.image.src && this.$refs.image.complete) {
      this.onLoaded()
    } else {
      this.$refs.image.addEventListener('load', this.onLoaded)
    }
  },
  methods: {
    lazyloadImage () {
      const img = new Image()

      img.onload = () => {
        this.$refs.image.src = this.source
        this.$el.classList.add('loaded')
      }

      img.src = this.source
    },
    onIntersect () {
      this.lazyloadImage()
    },
    onLoaded () {
      this.$emit('loaded')
      this.loaded = true
      this.$el.classList.remove('loading')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .imageComponent
    position relative
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

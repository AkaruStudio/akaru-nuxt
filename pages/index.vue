<template>
  <main
    id="home">
    <div class="container">
      <div class="row center">
        <h1 class="title">
          Akaru Nuxt template
        </h1>
      </div>

      <div class="row center collab observe-once">
        <nuxt-icon class="nuxt-icon" />

        <akaru-icon class="akaru-icon" />
      </div>

      <div class="row">
        <image-component
          ref="image"
          source="http://placecorgi.com/260/180"
          alt="image"
          :lazyload="true"
          lazyload-type="called"
          @loaded="onImageLoaded" />
      </div>
    </div>
  </main>
</template>

<script>
import AkaruIcon from '~/assets/svg/akaru.svg'
import NuxtIcon from '~/assets/svg/nuxt.svg'
import IntersectionObserverMixin from '~/mixins/IntersectionObserverMixin.js'
import ImageComponent from '~/components/ImageComponent.vue'
import { mapGetters } from 'vuex'

export default {
  components: {
    AkaruIcon,
    NuxtIcon,
    ImageComponent
  },
  mixins: [IntersectionObserverMixin],
  computed: {
    ...mapGetters(['loading/isLoading'])
  },
  watch: {
    isLoading (isLoading) {
      console.log('isLoading:', isLoading)
    }
  },
  mounted () {
    /**
     * EventBus plugin usage
     */
    // window event
    this.$e.on('click', () => console.log('click'))
    this.$e.on('raf', ({ dt }) => {
      // console.log('tick', dt)
    })

    // custom event
    this.$e.on('say_hi', (name) => console.log(`Hello ${name}`))
    this.$e.$emit('say_hi', 'Akaru')

    /**
     * Vuex loading module usage
     */
    this.$store.dispatch('loading/ADD_PENDING_REQUEST')

    // simulate API call
    window.setTimeout(() => {
      this.$store.dispatch('loading/REMOVE_PENDING_REQUEST')
    }, 1500)

    window.setTimeout(() => {
      this.$refs.image.lazyloadImage()
    }, 1500)
  },
  beforeDestroy () {
    this.$e.off('click')
    this.$e.off('say_hi')
  },
  methods: {
    onImageLoaded () {
      console.log('image loaded')
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/mixins.styl'
  @import '~@/assets/styles/breakpoints.styl'

  #home
    height 100vh

  .title
    title()
    margin-top 150px

    // breakpoints
    +large-up()
      fsz(70)

  .collab
    margin-top 100px
    align-items flex-end

  .akaru-icon
    height 50px
    margin 0 30px

  .nuxt-icon
    margin 0 30px
    height 80px
</style>

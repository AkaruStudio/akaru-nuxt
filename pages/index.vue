<template>
  <main
    id="home">
    <div class="container">
      <div class="row center">
        <appear name="fade-up">
          <h1 class="title">
            Akaru Nuxt template
          </h1>
        </appear>
      </div>

      <div class="row">
        <div>
          <appear
            v-for="val in 10"
            :key="val"
            name="fade-up"
            :delay="val/10">
            <p>test</p>
          </appear>
        </div>
      </div>

      <div class="row center collab observe-once">
        <app-svg
          name="nuxt_clean"
          class="nuxt-icon" />

        <app-svg
          name="akaru_clean"
          class="akaru-icon" />
      </div>

      <div class="row">
        <app-image
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
import IntersectionObserverMixin from '~/mixins/IntersectionObserverMixin.js'
import AppSvg from 'components/AppSvg.vue'
import AppImage from 'components/AppImage.vue'
import Appear from 'components/Appear.vue'
import { mapGetters } from 'vuex'
import MetasMixin from 'mixins/MetasMixin'

export default {
  components: {
    Appear,
    AppSvg,
    AppImage
  },
  mixins: [IntersectionObserverMixin, MetasMixin],
  data () {
    return {
      metas: {
        title: 'Home',
        description: 'This is the home description',
        image: require('assets/images/home/share.jpg')
      }
    }
  },
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
    this.$e.off('raf')
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

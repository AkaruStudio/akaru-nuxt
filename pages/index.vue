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
    </div>
  </main>
</template>

<script>
import AkaruIcon from '~/assets/svg/akaru.svg'
import NuxtIcon from '~/assets/svg/nuxt.svg'
import IntersectionObserverMixin from '~/mixins/IntersectionObserverMixin.js'
import { mapGetters } from 'vuex'

export default {
  components: {
    AkaruIcon,
    NuxtIcon
  },
  mixins: [IntersectionObserverMixin],
  computed: {
    ...mapGetters(['isLoading'])
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
    this.$store.dispatch('ADD_PENDING_REQUEST')

    // simulate API call
    window.setTimeout(() => {
      this.$store.dispatch('REMOVE_PENDING_REQUEST')
    }, 1500)
  },
  beforeDestroy () {
    this.$e.off('click')
    this.$e.off('say_hi')
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
    fsz(30)
    color #aaa
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

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

export default {
  components: {
    AkaruIcon,
    NuxtIcon
  },
  mixins: [IntersectionObserverMixin],
  mounted () {
    // this.$e.on('raf', ({ dt }) => {
    //   console.log('tick', dt)
    // })

    // window event
    this.$e.on('click', () => console.log('click'))

    // custom event
    this.$e.on('say_hi', (name) => console.log(`Hello ${name}`))
    this.$e.$emit('say_hi', 'Akaru')
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

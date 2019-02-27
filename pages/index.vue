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

    // this.$e.on('click', () => console.log('click'))
  }
}
</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/mixins.styl'

  #home
    height 100vh

  .title
    title()
    fsz(70)
    color #aaa
    margin-top 150px

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

<template>
  <div id="root">
    <app-debug v-if="showDebug" />
    <nuxt />
  </div>
</template>

<script>
import AppDebug from 'components/AppDebug'

if (process.browser) {
  require('intersection-observer')
}

export default {
  components: {
    AppDebug
  },
  computed: {
    showDebug () {
      return process.env.ENV !== 'prod'
    }
  },
  mounted () {
    this.$e.on('resize', () => {
      this.$store.dispatch('window/DETECT_BREAKPOINTS')
    })

    this.$store.dispatch('window/DETECT_ALL')
  },
}
</script>

<style lang="stylus" scoped>

</style>

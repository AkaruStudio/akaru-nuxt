<template>
  <div id="root">
    <!-- Debug -->
    <app-debug v-if="showDebug" />

    <!-- Content -->
    <nuxt />
  </div>
</template>

<script>
// components
import AppDebug from 'components/AppDebug'

// vuex
import { mapState } from 'vuex'

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
    },
    ...mapState({
      browser: state => state.window.browser
    })
  },
  watch: {
    browser (nv) {
      document.documentElement.dataset.os = nv.os
      document.documentElement.dataset.name = nv.name
      document.documentElement.dataset.version = nv.version
    }
  },
  mounted () {
    this.$e.on('resize', () => {
      this.$store.dispatch('window/DETECT_BREAKPOINTS')
    })

    this.$store.dispatch('window/DETECT_ALL')
  }
}
</script>

<style lang="stylus" scoped>

</style>

<template>
  <div id="root">
    <!-- <span class="bpDebug">
      breakpoint: {{ bp }}
    </span> -->
    <nuxt />
  </div>
</template>

<script>
import { mapState } from 'vuex'

if (process.browser) {
  require('intersection-observer')
}

export default {
  computed: {
    ...mapState({
      bp: state => state.window.breakpoint
    })
  },
  mounted () {
    window.addEventListener('resize', () => {
      this.$store.dispatch('DETECT_BREAKPOINTS')
    })

    this.$store.dispatch('DETECT_ALL')
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins'

.bpDebug
  position fixed
  top 0
  left 0
  font()
</style>

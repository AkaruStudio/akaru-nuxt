<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
if (process.browser) {
  require('intersection-observer')
}

export default {
  mounted () {
    window.addEventListener('resize', () => {
      this.$store.dispatch('DETECT_BREAKPOINTS')
    })

    this.$store.dispatch('DETECT_ALL')
  }
}
</script>

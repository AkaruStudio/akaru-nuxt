<template>
  <main id="home">
    <div class="container">
      <h1>test</h1>
    </div>
  </main>
</template>

<script>
import resizable from 'mixins/resizable'
import tickable from 'mixins/tickable'

export default {
  mixins: [resizable, tickable],
  methods: {
    onResize () {
      console.log('OK')
    },
    onTick () {
      console.log('tick')
    }
  }
}

</script>

<style lang="stylus" scoped>
  @import '~@/assets/styles/mixins.styl'
  @import '~@/assets/styles/breakpoints.styl'
  @import '~@/assets/styles/grid.styl'
</style>

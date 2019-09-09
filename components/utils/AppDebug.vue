<template>
  <div
    class="debugComponent"
    v-show="isActive">
    <span>{{ breakpoint }}</span>

    <div class="container fh">
      <div class="row fh">
        <div
          class="column"
          v-for="(_, index) in columns"
          :key="index">
          <div class="column-content" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      columns: 12,
      isActive: process.env.ENV === 'dev'
    }
  },
  computed: {
    ...mapState({
      breakpoint: state => state.window.breakpoint
    })
  },
  mounted () {
    window.toggleDebug = () => {
      this.isActive = !this.isActive
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/styles/mixins'
@import '~@/assets/styles/grid'

  .debugComponent
    full-parent()
    position fixed
    z-index 10000
    pointer-events none

  span
    position absolute
    top 15px
    left 15px
    font()

  .column
    height 100%
    size(1)

  .column-content
    border-left 1px solid rgba(#000, 0.2)
    border-right 1px solid rgba(#000, 0.2)
    height 100%
    background-color rgba(grey, 0.2)

</style>

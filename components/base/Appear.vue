<template>
  <div
    class="appearComponent observe-once"
    :class="name"
    :style="{
      transitionDelay
    }">
    <slot />
  </div>
</template>

<script>
// mixins
import IntersectionObserverMixin from 'mixins/IntersectionObserverMixin'

export default {
  mixins: [IntersectionObserverMixin],
  props: {
    name: {
      type: String,
      required: false,
      default: 'fade'
    },
    delay: {
      type: Number,
      required: false,
      default: 0
    }
  },
  computed: {
    transitionDelay () {
      return `${this.delay}s`
    }
  }
}
</script>

<style lang="stylus" scoped>
  .appearComponent
    &.fade
      opacity 0
      transition opacity 0.5s

      &.in-view
        opacity 1

    &.fade-up
      opacity 0
      transform translateY(30px)
      transition opacity 0.5s, transform 0.8s

      &.in-view
        transform translateY(0)
        opacity 1

</style>

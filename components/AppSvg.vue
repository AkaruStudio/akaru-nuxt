<template>
  <component
    class="svg"
    :is="svgComponent" />
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
  },
  computed: {
    svgComponent () {
      return () => import(`assets/svg/${this.name}.svg`)
    }
  }
}
</script>

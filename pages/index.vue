<template>
  <section>
    <h1>{{ bp }}</h1>
  </section>
</template>

<script>
export default {
  computed: {
    bp () {
      return this.$store.state.window.breakpoint
    }
  }
}
</script>

<style></style>

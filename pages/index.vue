<template>
  <section />
</template>

<script>
export default {
  mounted () {
    this.$e.on('raf', ({ dt }) => {
      console.log('tick', dt)
    })

    window.setTimeout(() => {
      this.$e.off('raf')
    }, 2000)
  }
}
</script>

<style></style>

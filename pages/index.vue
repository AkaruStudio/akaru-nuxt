<template>
  <section />
</template>

<script>
export default {
  mounted () {
    this.$e.on('mousemove', () => {
      console.log('mousemove de la page')
    })

    window.setTimeout(() => {
      this.$e.off('mousemove')
    }, 3000)
  }
}
</script>

<style></style>

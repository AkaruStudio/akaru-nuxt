<template>
  <div>
    <nuxt />
  </div>
</template>

<script>
if (process.browser) {
  require('intersection-observer')
}

export default {}
</script>

const tickable = {
  methods: {
    onTick () {}
  },
  beforeMount () {
    this.$bus.$on('tick', this.onTick)
  },
  beforeDestroy () {
    this.$bus.$off('tick', this.onTick)
  }
}

export default tickable

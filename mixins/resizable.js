const resizable = {
  mounted () {
    this.$bus.$on('resize', this.onResize)
  },
  beforeDestroy () {
    this.$bus.$off('resize', this.onResize)
  },
  methods: {
    onResize () {}
  }
}

export default resizable

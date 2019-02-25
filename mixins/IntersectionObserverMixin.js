export default {
  data () {
    return {
      observer: null
    }
  },
  mounted () {
    if (!this._isMounted || !this.$el.querySelectorAll) {
      return
    }

    this.observe()
  },
  methods: {
    observe () {
      let options = {
        threshold: 0.2
      }

      let observedElements = Array.from(this.$el.querySelectorAll('.observe'))
        .concat((this.$el.classList.contains('observe')) ? this.$el : [])

      if (observedElements.length > 0) {
        this.observer = new window.IntersectionObserver((intersections) => {
          intersections.forEach(intersection => {
            if (intersection.isIntersecting) {
              this.onIntersect(intersection.target)
            } else {
              this.onIntersectLeave(intersection.target)
            }
          })
        }, options)

        observedElements.forEach(el => this.observe.observe(el))
      }
    },
    unobserve (el) {
      this.observer.unobserve(el)
    },
    onIntersect (el) {
      el.classList.add('in-view')
    },
    onIntersectLeave (el) {
      el.classList.remove('in-view')
    }
  }
}

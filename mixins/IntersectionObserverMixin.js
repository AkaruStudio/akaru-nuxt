const CLASSES = ['observe', 'observe-once']

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

      let observedElements = []

      // construct css selector from CLASSES
      let cssSelector = CLASSES.map(className => `.${className}`).join(', ')

      // observe all elements that have one class from CLASSES
      observedElements.push(...Array.from(this.$el.querySelectorAll(cssSelector)))

      // observe component top tag if it contains one class from CLASSES
      if (CLASSES.some(className => this.$el.classList.contains(className))) {
        observedElements.push(this.$el)
      }

      if (observedElements.length > 0) {
        // construct observer
        this.observer = new window.IntersectionObserver((intersections) => {
          intersections.forEach(intersection => {
            if (intersection.isIntersecting) {
              this.onIntersect(intersection.target)
            } else {
              this.onIntersectLeave(intersection.target)
            }
          })
        }, options)

        observedElements.forEach(el => this.observer.observe(el))
      }
    },
    unobserve (el) {
      this.observer.unobserve(el)
    },
    onIntersect (el) {
      el.classList.add('in-view')

      if (el.classList.contains('observe-once')) {
        this.observer.unobserve(el)
      }
    },
    onIntersectLeave (el) {
      el.classList.remove('in-view')
    }
  }
}

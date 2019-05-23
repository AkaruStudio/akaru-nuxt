const CLASSES_OBSERVE = 'observe'
const CLASSES_OBSERVE_ONCE = 'observe-once'
const DATA_THRESHOLD = 'threshold'
const INTERSECT_CLASS = 'in-view'
const DEFAULT_THRESHOLD = [0]

export default {
  data () {
    return {
      observers: []
    }
  },
  mounted () {
    if (!this._isMounted || !this.$el.querySelectorAll) {
      return
    }

    this.IOAutoObserveChildren(this.$el)
  },
  methods: {
    IOCreateObserver (threshold = DEFAULT_THRESHOLD) {
      let observer = new window.IntersectionObserver(this.IOIntersectionChange, {
        threshold
      })
      this.observers.push(observer)

      return observer
    },
    IOGetObserver (threshold = DEFAULT_THRESHOLD) {
      let observer = this.observers.find(observer => observer.thresholds === threshold)

      return observer || this.IOCreateObserver(threshold)
    },
    IOAutoObserveChildren (parent) {
      let observedElements = []

      // construct css selector from CLASSES
      let cssSelector = [CLASSES_OBSERVE, CLASSES_OBSERVE_ONCE].map(className => `.${className}`).join(', ')

      // observe all elements that have one class from CLASSES
      observedElements.push(...Array.from(parent.querySelectorAll(cssSelector)))

      // observe component top tag if it contains one class from CLASSES
      if ([CLASSES_OBSERVE, CLASSES_OBSERVE_ONCE].some(className => parent.classList.contains(className))) {
        observedElements.push(parent)
      }

      observedElements.forEach(el => {
        let threshold = el.dataset && el.dataset[DATA_THRESHOLD]
        let observer = this.IOGetObserver(threshold || DEFAULT_THRESHOLD)

        observer.observe(el)
      })
    },
    IOIntersectionChange (intersections) {
      intersections.forEach(intersection => {
        if (intersection.isIntersecting) {
          this.onIntersect(intersection.target)
        } else {
          this.onIntersectLeave(intersection.target)
        }
      })
    },
    onIntersect (el) {
      el.classList.add(INTERSECT_CLASS)

      if (el.classList.contains(CLASSES_OBSERVE_ONCE)) {
        this.observers.forEach(o => o.unobserve(el))
      }
    },
    onIntersectLeave (el) {
      el.classList.remove(INTERSECT_CLASS)
    }
  }
}

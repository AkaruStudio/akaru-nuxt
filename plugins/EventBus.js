import Vue from 'vue'

const constructEventObject = (event) => {
  // basic event object
  let e = {
    target: window,
    eventName: null
  }

  // complete or override event object
  if (typeof event === 'string') {
    e.eventName = event
  } else {
    e = Object.assign({}, e, event)
  }

  return e
}

// https://stackoverflow.com/questions/9368538/getting-an-array-of-all-dom-events-possible
const DOM_EVENTS = Object.getOwnPropertyNames(document)
  .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(Object.getPrototypeOf(document))))
  .concat(Object.getOwnPropertyNames(Object.getPrototypeOf(window)))
  .filter(i => !i.indexOf('on') && (document[i] == null || typeof document[i] == 'function'))
  .filter((elem, pos, self) => self.indexOf(elem) == pos)
  .map(eventName => eventName.substr(2))

const isDomEvent = (eventName) => {
  return [...DOM_EVENTS, 'raf'].indexOf(eventName.toLowerCase()) === -1
}

const eventBus = new Vue({
  data () {
    return {
      rafId: null,
      events: {}
    }
  },
  methods: {
    on (event, cb) {
      // custom events, use native $on
      if (typeof event === 'string' && isDomEvent(event)) {
        this.$on(event, cb)
        return
      }

      event = constructEventObject(event)

      if (this.events[event.eventName]) {
        this.events[event.eventName].listeners.push(cb)
      } else {
        this.events[event.eventName] = {
          listeners: [cb],
          callback: this.onEvent.bind(this, event.eventName)
        }

        // add listener
        if (event.eventName === 'raf') {
          this.tick()
        } else {
          event.target.addEventListener(event.eventName, this.events[event.eventName].callback)
        }
      }
    },
    off (event, cb = null) {
      // custom events, use native $on
      if (typeof event === 'string' && isDomEvent(event)) {
        this.$off(event, cb)
        return
      }

      event = constructEventObject(event)

      if (!this.events[event.eventName]) return

      if (cb) {
        let index = this.events[event.eventName].listeners.findIndex(eventCallback => cb === eventCallback)
        this.events[event.eventName].listeners.splice(index, 1)

        if (this.events[event.eventName].listeners.length > 0) return
      }

      // remove listener
      if (event.eventName === 'raf') {
        window.cancelAnimationFrame(this.rafId)
      } else {
        event.target.removeEventListener(event.eventName, this.events[event.eventName].callback)
      }

      delete this.events[event.eventName]
    },
    onEvent (eventName, e) {
      this.events[eventName].listeners.forEach(cb => cb(e))
    },
    tick (dt) {
      this.onEvent('raf', {
        dt
      })

      this.rafId = window.requestAnimationFrame(this.tick)
    }
  }
})

export default (_, inject) => {
  inject('e', eventBus)
}

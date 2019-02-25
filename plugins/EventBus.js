import Vue from 'vue'

const eventBus = new Vue({
  data () {
    return {
      events: {}
    }
  },
  methods: {
    on (event, cb) {
      let e = {
        target: window,
        eventName: null
      }

      if (typeof event === 'string') {
        e.eventName = event
      } else {
        e = Object.assign({}, e, event)
      }

      if (this.events[e.eventName]) {
        this.events[e.eventName].listeners.push(cb)
      } else {
        this.events[e.eventName] = {
          listeners: [cb],
          callback: this.onEvent.bind(this, e.eventName)
        }

        e.target.addEventListener(e.eventName, this.events[e.eventName].callback)
      }
    },
    off (event, cb = null) {
      let e = {
        target: window,
        eventName: null
      }

      if (typeof event === 'string') {
        e.eventName = event
      } else {
        e = Object.assign({}, e, event)
      }

      if (!this.events[e.eventName]) return

      if (cb) {
        let index = this.events[e.eventName].listeners.findIndex(eventCallback => cb === eventCallback)
        this.events[e.eventName].listeners.splice(index, 1)

        if (this.events[e.eventName].listeners.length === 0) {
          e.target.removeEventListener(e.eventName, this.events[e.eventName].callback)
          delete this.events[e.eventName]
        }
      } else {
        e.target.removeEventListener(e.eventName, this.events[e.eventName].callback)
        delete this.events[e.eventName]
      }
    },
    onEvent (eventName, e) {
      this.events[eventName].listeners.forEach(cb => cb(e))
    }
  }
})

export default (_, inject) => {
  inject('e', eventBus)
}

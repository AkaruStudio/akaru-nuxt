import Vue from 'vue'

// Q-image
import QImage from '@qneyraud/q-image'
import '@qneyraud/q-image/dist/QImage.css'
Vue.component('QImage', QImage)

const requireComponent = require.context('../components/base', true, /[a-zA-Z]*\.vue/)

requireComponent.keys().forEach(function (fileName) {
  let baseComponentConfig = requireComponent(fileName)
  baseComponentConfig = baseComponentConfig.default || baseComponentConfig
  const baseComponentName = baseComponentConfig.name || (
    fileName
      .replace(/^.+\//, '')
      .replace(/\.\w+$/, '')
  )
  Vue.component(baseComponentName, baseComponentConfig)
})

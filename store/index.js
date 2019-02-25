import Vuex from 'vuex'
// modules
import window from './modules/window'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      window
    }
  })
}

export default createStore

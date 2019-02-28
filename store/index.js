import Vuex from 'vuex'
// modules
import window from './modules/window'
import loading from './modules/loading'

const createStore = () => {
  return new Vuex.Store({
    modules: {
      window,
      loading
    }
  })
}

export default createStore

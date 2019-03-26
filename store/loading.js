export const state = () => ({
  pendingRequest: 0,
  assetsLoading: 0
})

export const mutations = {
  UPDATE_ASSETS_LOADING (state, payload) {
    state.assetsLoading += payload
  },
  UPDATE_PENDING_REQUEST (state, payload) {
    state.pendingRequest += payload
  }
}

export const actions = {
  ADD_ASSET_LOADING ({ commit }) {
    commit('UPDATE_ASSETS_LOADING', 1)
  },
  REMOVE_ASSET_LOADING ({ commit }) {
    commit('UPDATE_ASSETS_LOADING', -1)
  },
  ADD_PENDING_REQUEST ({ commit }) {
    commit('UPDATE_PENDING_REQUEST', 1)
  },
  REMOVE_PENDING_REQUEST ({ commit }) {
    commit('UPDATE_PENDING_REQUEST', -1)
  }
}

export const getters = {
  hasPendingRequest (state) {
    return state.pendingRequest > 0
  },
  hasAssetsLoading (state) {
    return state.assetsLoading > 0
  },
  isLoading (_, getters) {
    return getters.hasPendingRequest || getters.hasAssetsLoading
  }
}

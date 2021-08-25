const state = {
  test: false
}

const actions = {
  setTest ({ commit }, test) {
    commit('setTest', test)
  }
}

const mutations = {
  setTest (state, test) {
    state.test = test
  }
}

export default {
  state,
  actions,
  mutations
}

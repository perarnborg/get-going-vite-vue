import { getMenuItems } from '@/services/api-service'

const state = {
  menuItems: null
}

const actions = {
  async getMenuItems ({ commit }) {
    let menuItems = []
    try {
      menuItems = await getMenuItems()
    } catch(error) {
      console.error(error)
    }
    commit('setMenuItems', menuItems)
  }
}

const mutations = {
  setMenuItems (state, menuItems) {
    state.menuItems = menuItems
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}

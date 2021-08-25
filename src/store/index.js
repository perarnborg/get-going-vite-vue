import { createStore } from 'vuex'

import navigationStore from './modules/navigation-store'

export default createStore({
  modules: {
    navigationStore
  }
})

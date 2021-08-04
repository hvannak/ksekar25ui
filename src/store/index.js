import { createStore } from 'vuex'
import User from './modules/user'
import Language from './modules/languages'

export default createStore({
  modules: {
    User,
    Language
  }
})

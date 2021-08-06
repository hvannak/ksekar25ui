import { createStore } from 'vuex'
import User from './modules/user'
import Language from './modules/languages'
import Category from './modules/category'
import Product from './modules/product'

export default createStore({
  modules: {
    User,
    Language,
    Category,
    Product
  }
})

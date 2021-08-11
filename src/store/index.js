import { createStore } from 'vuex'
import User from './modules/user'
import Language from './modules/languages'
import Category from './modules/category'
import Currency from './modules/currency'
import Product from './modules/product'
import Notification from './modules/notification'
import Post from './modules/post'

export default createStore({
  modules: {
    User,
    Language,
    Category,
    Product,
    Currency,
    Notification,
    Post
  }
})

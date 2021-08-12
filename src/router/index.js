import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Notification from '../views/Notification.vue'
import Products from '../views/Products.vue'
import Login from '../views/Login.vue'
import ControlPanel from '../views/ControlPanel.vue'
import Languages from '../views/manage/Languages.vue'
import Localize from '../views/manage/Localize.vue'
import ControlProducts from '../views/manage/CtlProducts.vue'
import ControlPost from '../views/manage/CtlPost.vue'
import Category from '../views/manage/Category.vue'
import Currency from '../views/manage/Currency.vue'
import Users from '../views/manage/Users.vue'
import ControlNotification from '../views/manage/CtlNotification.vue'
import Presentation from '../views/manage/Presentation.vue'
import Promotion from '../views/manage/Promotion.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/notication',
    name: 'Notification',
    component: Notification
  },
  {
    path: '/products',
    name: 'Products',
    component: Products
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/controlpanel',
    name: 'ControlPanel',
    meta: { title: 'Control Panel',icon: 'mdi-folder' },
    component: ControlPanel,
    children:[
      {
        path: 'languages',
        name: 'Languages',
        meta: { title: 'Languages',group:'setting'},
        component: Languages
      },
      {
        path: 'category',
        name: 'Category',
        meta: { title: 'Category',group:'setting' },
        component: Category
      },
      {
        path: 'currency',
        name: 'Currency',
        meta: { title: 'Currency',group:'setting' },
        component: Currency
      },
      {
        path: 'localize',
        name: 'Localize',
        meta: { title: 'Localize',group:'setting' },
        component: Localize
      },
      {
        path: 'ctlproducts',
        name: 'CtlProducts',
        meta: { title: 'Products',group:'workarea'},
        component: ControlProducts
      },
      {
        path: 'ctlposts',
        name: 'CtlPosts',
        meta: { title: 'Posts',group:'workarea'},
        component: ControlPost
      },
      {
        path: 'ctlnotification',
        name: 'CtlNotification',
        meta: { title: 'Notification',group:'workarea'},
        component: ControlNotification
      },
      {
        path: 'presentation',
        name: 'Presentation',
        meta: { title: 'Presentation',group:'workarea'},
        component: Presentation
      },
      {
        path: 'promotion',
        name: 'Promotion',
        meta: { title: 'Promotion',group:'workarea'},
        component: Promotion
      },
      {
        path: 'users',
        name: 'Users',
        meta: { title: 'Users',group:'auth' },
        component: Users
      },
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  if((to.name == 'Login' && localStorage.getItem('token') != null)){
    next({name:'ControlPanel'});
  }
  if(to.fullPath.startsWith('/controlpanel') && localStorage.getItem('token') == null ){
    next({name:'Home'});
  }
  else next()
});

export default router

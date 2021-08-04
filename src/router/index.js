import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Notification from '../views/Notification.vue'
import Products from '../views/Products.vue'
import Login from '../views/Login.vue'
import ControlPanel from '../views/ControlPanel.vue'
import Languages from '../views/manage/Languages.vue'
import Localize from '../views/manage/Localize.vue'
import ControlProducts from '../views/manage/CtlProducts.vue'
import ControlPosts from '../views/manage/CtlPosts.vue'

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
        component: ControlPosts
      },
      {
        path: 'users',
        name: 'Users',
        meta: { title: 'Users',group:'auth' },
        component: Login
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

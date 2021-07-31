import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Notification from '../views/Notification.vue'
import Products from '../views/Products.vue'
import Login from '../views/Login.vue'
import ControlPanel from '../views/ControlPanel.vue'
import About from '../views/About.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
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
        path: 'setting',
        name: 'Setting',
        meta: { title: 'Languages',icon: 'cogs'},
        component: About,
        children:[
          {
            path: 'languages',
            name: 'Languages',
            meta: { title: 'Languages',icon: 'bell'},
            component: Home
          },
          {
            path: 'localize',
            name: 'Localize',
            meta: { title: 'Localize',icon: 'language' },
            component: Login
          },
        ]
      }

    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// router.beforeEach((to, from, next) => {
//   if((to.name == 'Login' && localStorage.getItem('token') != null)){
//     next({name:'ControlPanel'});
//   }
//   if(to.fullPath.startsWith('/controlpanel') && localStorage.getItem('token') == null ){
//     next({name:'Home'});
//   }
//   else next()
// });

export default router

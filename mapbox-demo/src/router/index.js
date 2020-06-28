import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

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
    path: '/demo2',
    name: 'Demo2',
    component: () => import('../views/Demo2.vue')
  },
  {
    path: '/demo3',
    name: 'Demo3',
    component: () => import('../views/Demo3.vue')
  },  
  {
    path: '/demo4',
    name: 'Demo4',
    component: () => import('../views/Demo4.vue')
  },   
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Router from 'vue-router'
import Vue from 'vue'
import Home from '../pages/home.vue'
import Verify from '../pages/verify.vue'
import Login from '../pages/login.vue'
import Puzzle from '../pages/puzzle.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/verify',
    name: 'verify',
    component: Verify
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }, {
    path: '/puzzle',
    name: 'puzzle',
    component: Puzzle
  }
]

const router = new Router({
  routes
})

export default router
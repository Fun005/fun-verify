import Router from 'vue-router'
import Vue from 'vue'
import Home from '../pages/home.vue'
import Verify1 from '../pages/verify1.vue'
import Verify2 from '../pages/verify2.vue'
import Verify3 from '../pages/verify3.vue'
import Login from '../pages/login.vue'

Vue.use(Router)

const routes = [
  {
    path: '/',
    component: Home
  }, {
    path: '/verify1',
    name: 'verify1',
    component: Verify1
  }, {
    path: '/verify2',
    name: 'verify2',
    component: Verify2
  }, {
    path: '/verify3',
    name: 'verify3',
    component: Verify3
  }, {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new Router({
  routes
})

export default router
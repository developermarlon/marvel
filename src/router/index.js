import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/components/screens/Register.vue'
import Login from '@/components/screens/Login.vue'
import Home from '@/components/screens/Home.vue'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

export const router = new Router({
  mode: 'history',
  base: '/',
  routes
})

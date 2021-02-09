import Vue from 'vue'
import App from './App'
import store from './store'
import  { router } from './router'
import {server} from '../src/constants'

Vue.config.productionTip = false

require('./plugins/fontawesome');

import VueSocketio from 'vue-socket.io';
Vue.use(new VueSocketio({
  debug: false,
  connection: server.get(),
    query: {
        token: window.localStorage.getItem('auth')
    }
}))

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
Vue.use(VueSweetalert2);

import VueCarousel from 'vue-carousel';
Vue.use(VueCarousel);

import VueMeta from 'vue-meta'
Vue.use(VueMeta)

Vue.directive('scroll', {
  inserted(el, binding, vnode) {
    window.addEventListener('scroll', (e) => {
      binding.value(window.pageYOffset)
    })
  },
  unbind(el, binding, vnode){
    window.removeEventListener('keyup', (e) => {
      console.log('elimina evento scroll')
    })
  }
})

new Vue({ 
  el: '#app', 
  router,
  store,
  components: { App },
  watch: {
    $route(to, from) {
      Vue.nextTick()
      .then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      })
    }
  },
  template: '<App/>'
})

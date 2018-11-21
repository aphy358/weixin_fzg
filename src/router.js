import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home/home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/citySelect',
      name: 'citySelect',
      component: () => import('./views/CitySelect/citySelect.vue')
    }
  ]
})

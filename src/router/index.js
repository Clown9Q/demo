import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Rigister from "../components/rigister";
import ks from "../components/ks"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Rigister',
      name: 'Rigister',
      component: Rigister
    }
    ,
    {
      path: '/ks',
      name: 'ks',
      component: ks
    }
  ]
})

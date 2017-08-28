import Vue from 'vue'
import Router from 'vue-router'
import DefaultPage from '@/components/pages/DefaultPage'
import UsersListPage from '@/components/pages/UsersListPage'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: DefaultPage
    },
    {
      path: '/users',
      name: 'UsersList',
      component: UsersListPage
    }
  ]
})

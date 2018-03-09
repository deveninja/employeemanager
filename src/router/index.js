import Vue from 'vue'
import Router from 'vue-router'
import dashboard from '@/components/dashboard'
import newEmployee from '@/components/newEmployee'
import viewEmployee from '@/components/viewEmployee'
import editEmployee from '@/components/editEmployee'
import login from '@/components/login'
import register from '@/components/register'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: dashboard
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/new',
      name: 'new-employee',
      component: newEmployee
    },
    {
      path: '/edit/:employee_id',
      name: 'edit-employee',
      component: editEmployee
    },
    {
      path: '/:employee_id',
      name: 'view-employee',
      component: viewEmployee
    }
  ]
})

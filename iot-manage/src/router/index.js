import Vue from 'vue'
import Router from 'vue-router'
import companydetail from '@/components/pages/company/companydetail'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['../components/pages/login.vue'], resolve),
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../components/pages/login.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../components/pages/home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../components/pages/company/certification.vue'], resolve),
          redirect: 'certification'
        },
        {
          path: 'certification',
          component: resolve => require(['../components/pages/company/certification.vue'], resolve),
          query: {
            timestamp: new Date().getTime()
          }
        },
        {
          path: 'companydetail/:id',
          name: 'companydetail',
          // component: resolve => require(['../components/pages/company/companydetail.vue'], resolve)
          component: companydetail
        },
        {
          path: 'apply',
          component: resolve => require(['../components/pages/number/apply.vue'], resolve)
        }
      ]
    }
  ]
})

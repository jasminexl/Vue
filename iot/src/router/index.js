import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: resolve => require(['../pages/login.vue'], resolve),
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['../pages/login.vue'], resolve)
    },
    {
      path: '/forgetpsw',
      component: resolve => require(['../pages/forgetpsw.vue'], resolve)
    },
    {
      path: '/home',
      component: resolve => require(['../pages/home.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../pages/mymain.vue'], resolve),
          redirect: 'main'
        },
        {
          path: 'main',
          component: resolve => require(['../pages/mymain.vue'], resolve)
        },
        {
          path: 'apply',
          component: resolve => require(['../pages/number/apply.vue'], resolve)
        },
        {
          path: 'handle',
          component: resolve => require(['../pages/number/handle.vue'], resolve)
        },
        {
          path: 'query',
          component: resolve => require(['../pages/number/query.vue'], resolve)
        },
        {
          path: 'users',
          component: resolve => require(['../pages/users/users.vue'], resolve)
        },
        {
          path: 'usage',
          component: resolve => require(['../pages/traffic/usage.vue'], resolve)
        },
        {
          path: 'detail',
          component: resolve => require(['../pages/traffic/detail.vue'], resolve)
        },
        {
          path: 'attribute',
          component: resolve => require(['../pages/setting/attribute.vue'], resolve)
        },
        {
          path: 'companyinfo',
          component: resolve => require(['../pages/setting/companyinfo.vue'], resolve)
        },
        {
          path: 'certification',
          component: resolve => require(['../pages/setting/certification.vue'], resolve)
        },
        {
          path: 'password',
          component: resolve => require(['../pages/setting/password.vue'], resolve)
        }
      ]
    }
  ]
})

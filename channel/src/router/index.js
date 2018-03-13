import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/page/login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      redirect: '/login'
    },
    {
      path: '/home',
      component: resolve => require(['../components/commom/home.vue'], resolve),
      meta: {
        requireAuth: true
      },
      children: [
        {
          path: '/',
          component: resolve => require(['../components/page/welcome.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'one',
          component: resolve => require(['../components/page/one.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'two',
          component: resolve => require(['../components/page/two.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'three',
          component: resolve => require(['../components/page/three.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'content/:id',
          component: resolve => require(['../components/page/content.vue'], resolve),
          meta: {
            requireAuth: true
          }
        },
        {
          path: 'ordertest',
          component: resolve => require(['../components/page/ordertest.vue'], resolve)
          // meta: {
          //   requireAuth: true
          // }
        }
      ]
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '*',
      component: resolve => require(['../components/page/404.vue'], resolve),
      meta: {
        requireAuth: true
      }
    }
  ]
})

export default router

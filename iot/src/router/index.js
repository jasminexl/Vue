import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: resolve => require(['../pages/account.vue'], resolve),
      redirect: '/account'
    },
    {
      path: '/account',
      component: resolve => require(['../pages/account.vue'], resolve),
      children: [
        {
          path: '/',
          component: resolve => require(['../pages/login.vue'], resolve),
          redirect: 'login'
        },
        {
          path: 'login',
          component: resolve => require(['../pages/login.vue'], resolve),
          meta: {
            title: '登录 - 订单管理系统'
          }
        },
        {
          path: 'forgetpsw',
          component: resolve => require(['../pages/forgetpsw.vue'], resolve),
          meta: {
            title: '忘记密码 - 订单管理系统'
          }
        }
      ]
    },
    // {
    //   path: '/login',
    //   component: resolve => require(['../pages/login.vue'], resolve)
    // },
    // {
    //   path: '/forgetpsw',
    //   component: resolve => require(['../pages/forgetpsw.vue'], resolve)
    // },
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
          component: resolve => require(['../pages/mymain.vue'], resolve),
          meta: {
            title: '账户总览 - 订单管理系统'
          }
          // beforeEnter: (to, from, next) => {
          //   Message.warning('请先进行企业信息认证！')
          //   next('/home/certification')
          // },
        },
        {
          path: 'apply',
          component: resolve => require(['../pages/number/apply.vue'], resolve),
          meta: {
            title: '号码申请 - 订单管理系统'
          }
        },
        {
          path: 'applydetail/:id',
          name: 'applydetail',
          component: resolve => require(['../pages/number/applydetail.vue'], resolve)
        },
        {
          path: 'handle',
          component: resolve => require(['../pages/number/handle.vue'], resolve),
          meta: {
            title: '号码操作 - 订单管理系统'
          }
        },
        {
          path: 'query',
          component: resolve => require(['../pages/number/query.vue'], resolve)
        },
        {
          path: 'users',
          component: resolve => require(['../pages/users/users.vue'], resolve),
          meta: {
            title: '用户量管理 - 订单管理系统'
          }
        },
        {
          path: 'usage',
          component: resolve => require(['../pages/traffic/usage.vue'], resolve)
        },
        {
          path: 'usagedetail/:id',
          name: 'usagedetail',
          component: resolve => require(['../pages/traffic/usagedetail.vue'], resolve)
        },
        {
          path: 'attribute',
          component: resolve => require(['../pages/setting/attribute.vue'], resolve)
        },
        {
          path: 'companyinfo',
          component: resolve => require(['../pages/setting/companyinfo.vue'], resolve),
          meta: {
            title: '企业信息 - 订单管理系统'
          }
        },
        {
          path: 'certification',
          name: 'certification',
          component: resolve => require(['../pages/setting/certification.vue'], resolve),
          meta: {
            title: '企业认证 - 订单管理系统'
          }
        },
        {
          path: 'password',
          component: resolve => require(['../pages/setting/password.vue'], resolve),
          meta: {
            title: '修改密码 - 订单管理系统'
          }
        }
      ]
    }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import { Layout } from '@/views'

Vue.use(Router)

/* Constant Router Map No Permission Verify */
export const constantRouterMap = [
  {
    path: '/login',
    name: 'login',
    hidden: false,
    component: () => import('@/views/Login/index')
  },
  {
    path: '/',
    hidden: false,
    redirect: '/index',
    component: Layout,
    children: [
      {
        path: '/index',
        meta: {
          title: '用户中心',
          icon: 'home-page'
        },
        name: 'HomePage',
        hidden: false,
        component: () => import('@/views/HomePage/index')
      }
    ]
  }
]

/* Global Route */
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    children: [{
      path: 'user',
      name: 'User',
      component: () => import('@/views/user'),
      meta: { title: '用户', icon: 'el-icon-user' }
    }]
  },

  {
    path: '/staticData',
    component: Layout,
    redirect: '/staticData/homeImg',
    meta: { title: '静态数据', icon: 'el-icon-edit' },
    children: [
      {
        path: 'homeImg',
        component: () => import("@/views/staticData/homeImg"),
        meta: { title: '首页轮播图' }
      },
      {
        path: "intor",
        component: () => import("@/views/staticData/intor"),
        meta: { title: '简介' }
      },
      {
        path: 'notice',
        component: () => import("@/views/staticData/notice"),
        meta: { title: "公告" }
      },
      {
        path: 'older',
        component: () => import("@/views/staticData/older"),
        meta: { title: '优秀学长信息' }
      },
      {
        path: 'sentence',
        component: () => import('@/views/staticData/sentence'),
        meta: { title: '首页励志语句' }
      }
    ]
  },
  {
    path: '/talk',
    component: Layout,
    redirect: '/talk/talkKinds/index',
    meta: {
      title: '论坛管理',
      icon: 'el-icon-lock'
    },
    children: [
      {
        path: 'talkKinds/index',
        component: () => import("@/views/talk/talkKinds"),
        meta: {
          title: '帖子分类',
        },
      },
      {
        path: 'talkList/index',
        component: () => import("@/views/talk/talkList"),
        meta: {
          title: '全部帖子',
        },
      }

    ]
  },
  {
    path: '/contest',
    component: Layout,
    children: [{
      path: 'contest',
      name: 'Contest',
      component: () => import('@/views/contest'),
      meta: { title: '比赛招募', icon: 'el-icon-s-order' }
    }]
  },
   {
    path: '/getnew',
    component: Layout,
    children: [{
      path: 'getnew',
      name: 'Getnew',
      component: () => import('@/views/getNew'),
      meta: { title: '招新', icon: 'el-icon-bell' }
    }]
  },


]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router

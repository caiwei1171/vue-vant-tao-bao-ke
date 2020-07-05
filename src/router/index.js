import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 路由映射关系
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name:"Home",
    component: () => import('../views/home/Home'),
    children:[
      {
        path:'homeItem/:id',
        name:"HomeItem",
        component:() => import("../views/home/child/HomeItem"),
        meta:{
          title:"商品列表"
        }
      }
    ],
    meta:{
      title:"首页"
    }
  },
  {
    path: '/hot',
    name:"Hot",
    component: () => import('../views/hot/Hot'),
    meta:{
      title:"推荐"
    }
  },
  {
    path: '/category',
    name:"Category",
    component: () => import('../views/category/Category'),
    meta:{
      title:"分类"
    }
  },
  {
    path: '/profile',
    name:"Profile",
    component: () => import('../views/profile/Profile'),
    meta:{
      title:"我的"
    }
  },
  {
    path:"/profile/footPrint",
    name:"FootPrint",
    component: () => import('@/components/common/FootPrint'),
    meta:{
      title:"我的足迹"
    } 
  },
  {
    path:"/profile/about",
    name:"About",
    component: () => import('../views/profile/childs/About'),
    meta:{
      title:"关于我们"
    } 
  },
  {
    path:"/profile/setting",
    name:"Setting",
    component: () => import('../views/profile/childs/Setting'),
    meta:{
      title:"设置"
    } 
  },
  {
    path:"/productItem",
    name:"ProductItem",
    component: () => import('@/components/common/ProductItem'),
    meta:{
      title:"产品"
    } 
  },
  {
    path:"/productItem/details",
    name:"Details",
    component: () => import('@/components/common/Details'),
    meta:{
      title:"商品详情"
    } 
  },
  {
    path:"/search",
    name:"Search",
    component: () => import('@/components/common/Search'),
    meta:{
      title:"搜索"
    } 
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 全局守卫
router.beforeEach((to, from, next) => {
  //路由发生改变时,触发
  window.document.title = to.meta.title == undefined ? '默认标题' : to.meta.title
  next();
})

export default router

import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from "~/views/layouts/admin.vue"
import Index from '~/views/login/index.vue'
import About from '~/views/about/index.vue'
import NotFound from '~/views/error/404.vue'
import GoodsList from '~/views/goods/list.vue'
import CategoryList from '~/views/category/list.vue'
import DashBoard from '~/views/dashboard/index.vue'
import UserList from '~/views/user/list.vue'
import OrderList from '~/views/order/list.vue'
import CommentList from '~/views/comment/list.vue'
import ImageList from '~/views/image/list.vue'
import NoticeList from '~/views/notice/list.vue'
import SettingBase from '~/views/setting/base.vue'
import CouponList from '~/views/coupon/list.vue'
import ManagerList from '~/views/manager/list.vue'

//默认路由单独页面
const routes = [
  { path: '/', component: Index, meta:{ title: '登陆' } },
  { path: '/admin/', component: Admin, name: 'admin', meta:{ title: '首页' }},
  { path: '/about', component: About, meta:{ title: '关于' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

//动态路由数组 框架内页面
  const asyncRoutes = [
    { 
      path: '/dashboard/',
      name: '/dashboard/',
      component: DashBoard,
      meta: {
        title: '系统首页'
      }
    },{
      path: '/goods/list',
      name: '/goods/list',
      component: GoodsList,
      meta: {
        title: '商品管理'
      }
    },{
      path: '/category/list',
      name: '/category/list',
      component: CategoryList,
      meta: {
        title: '分类列表'
      }
    },{
      path: '/user/list',
      name: '/user/list',
      component: UserList,
      meta: {
        title: '用户列表'
      }
    },{
      path: '/order/list',
      name: '/order/list',
      component: OrderList,
      meta: {
        title: '订单列表'
      }
    },{
      path: '/comment/list',
      name: '/comment/list',
      component: CommentList,
      meta: {
        title: '评价列表'
      }
    },{
      path: '/image/list',
      name: '/image/list',
      component: ImageList,
      meta: {
        title: '图库列表'
      }
    },{
      path: '/notice/list',
      name: '/notice/list',
      component: NoticeList,
      meta: {
        title: '公告列表'
      }
    },{
      path: '/setting/base',
      name: '/setting/base',
      component: SettingBase,
      meta: {
        title: '配置列表'
      }
    },{
      path: '/coupon/list',
      name: '/coupon/list',
      component: CouponList,
      meta: {
        title: '优惠券列表'
      }
    },{
      path: '/manager/list',
      name: '/manager/list',
      component: ManagerList,
      meta: {
        title: '管理员列表'
      }
    }
  ]

  export const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
  
  //动态添加路由的办法
  export function addRoutes(menus){
    // 是否有新的路由
    let hasNewRoutes = false
    const findAndAddRoutesByMenus = (arr) =>{
        arr.forEach(e=>{
            let item = asyncRoutes.find(o=>o.path == e.frontpath)
            if(item && !router.hasRoute(item.path)){
                router.addRoute("admin",item)
                hasNewRoutes = true
            }
            if(e.child && e.child.length > 0){
                findAndAddRoutesByMenus(e.child)
            }
        })
    }

    findAndAddRoutesByMenus(menus)

    return hasNewRoutes
}
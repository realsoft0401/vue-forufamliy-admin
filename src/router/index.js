import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from "~/views/layouts/admin.vue"
import Index from '~/views/login/index.vue'
import About from '~/views/about/index.vue'
import NotFound from '~/views/error/404.vue'
import GoodsList from '~/views/goods/list.vue'
import CategoryList from '~/views/category/list.vue'
import DashBoard from '~/views/dashboard/index.vue'

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
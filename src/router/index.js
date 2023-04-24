import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from "~/views/layouts/admin.vue"
import Index from '~/views/login/index.vue'
import About from '~/views/about/index.vue'
import Dashboard from '~/views/dashboard/index.vue'
import NotFound from '~/views/error/404.vue'
import GoodsList from '~/views/goods/list.vue'
import CategoryList from '~/views/category/list.vue'
// const routes = [
//     { path: '/admin/', component: Admin, 
//       children:[{
//         path: '/admin/',
//         component: Admin,
//         meta: {
//           title: '系统首页'
//         }
//       },{
//         path: '/goods/list',
//         component: GoodsList,
//         meta: {
//           title: '商品管理'
//         }
//       },{
//         path: '/category/list',
//         component: CategoryList,
//         meta: {
//           title: '分类列表'
//         }
//       }]
//     },

//     { path: '/', component: Index, meta:{ title: '登陆' } },
//     { path: '/about', component: About, meta:{ title: '关于' } },
//     { path: '/dashboard', component: Dashboard, meta:{ title: '系统首页' } },
//     { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
//   ]

//默认路由
const routes = [
  { 
    path: '/admin/', component: Admin, name: 'admin', 
  },

  { path: '/', component: Index, meta:{ title: '登陆' } },
  { path: '/about', component: About, meta:{ title: '关于' } },
  { path: '/dashboard', component: Dashboard, meta:{ title: '系统首页' } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]

  //动态路由数组
  const asyncRoutes = [
    { 
        path: '/admin/',
        name: '/admin/',
        component: Admin,
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
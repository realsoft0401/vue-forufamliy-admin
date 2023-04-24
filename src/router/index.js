import { createRouter, createWebHashHistory } from 'vue-router'
import Admin from "~/views/layouts/admin.vue"
import Index from '~/views/login/index.vue'
import About from '~/views/about/index.vue'
import Dashboard from '~/views/dashboard/index.vue'
import NotFound from '~/views/error/404.vue'
import GoodsList from '~/views/goods/list.vue'
const routes = [
    { path: '/admin/', component: Admin, 
      children:[{
        path: '/admin/',
        component: Admin,
        meta: {
          title: '系统首页'
        }
      },{
        path: '/goods/list',
        component: GoodsList,
        meta: {
          title: '商品管理'
        }
      }]
    },

    { path: '/', component: Index, meta:{ title: '登陆' } },
    { path: '/about', component: About, meta:{ title: '关于' } },
    { path: '/dashboard', component: Dashboard, meta:{ title: '系统首页' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
  
export default router
import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/views/login/index.vue'
import About from '~/views/about/index.vue'
import Dashboard from '~/views/dashboard/index.vue'
import NotFound from '~/views/error/404.vue'

const routes = [
    { path: '/', component: Index, meta:{ titel: '登陆' } },
    { path: '/about', component: About, meta:{ titel: '关于' } },
    { path: '/dashboard', component: Dashboard, meta:{ titel: '系统首页' } },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
  
export default router
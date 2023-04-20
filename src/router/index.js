import { createRouter, createWebHashHistory } from 'vue-router'
import Index from '~/views/login/index.vue'
import About from '~/views/about/index.vue'
import NotFound from '~/views/error/404.vue'

const routes = [
    { path: '/', component: Index },
    { path: '/about', component: About },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
  ]

  const router = createRouter({
    history: createWebHashHistory(),
    routes, // `routes: routes` 的缩写
  })
  
export default router
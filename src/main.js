import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './router'
import store from './store' 
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)

app.use(store)

app.use(router)

app.use(ElementPlus)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

import 'virtual:windi.css'

//全局前守卫 和 全局后守卫
import './utils/permission'

import "nprogress/nprogress.css"

//全局性指令别名
import directives from './utils/directives'
//全局性指令
app.use(directives)

app.mount('#app')

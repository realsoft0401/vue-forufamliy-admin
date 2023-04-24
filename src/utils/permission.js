import router from "~/router";
import { getToken } from "~/utils/cookies"
import { notification } from '~/utils/notification'
import store from "~/store";
import { showFullLoading, hideFullLoading} from "~/utils/nprogress"
//全局前置守卫
router.beforeEach(async (to, from, next) => {
    showFullLoading()
    // console.log("全局前置守卫")
    const token = getToken()
    //没有token 强制跳转登陆页面 但要排除登陆页
    if(!token && to.path != '/'){
        notification('登陆信息缺失', '请先登陆再进入系统', 'error', 3000)
        return next({ path: '/' })
    }

    //防止重复登陆的判断
    if(token && to.path == '/'){
        notification('重复登陆', '用户请勿重复登陆', 'warning', 2000)
        return next({ path: "/admin/" })
    }

    // 如果用户登陆了，就自动获取用户信息，并存储在vuex
    if(token){
       await store.dispatch("getinfo")
    }
    //设置页面标题
    let title = (to.meta.title ? to.meta.title : "") + "-福佑家和后台演示系统"
    document.title = title
    next()
})

//全局后置守卫
router.afterEach((to, from) => {
    hideFullLoading()
})
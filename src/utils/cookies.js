import { useCookies } from '@vueuse/integrations/useCookies'
const TokenKey = "sys-token"
const cookie =  useCookies()

// 获取token
export function getToken(){
    return cookie.get(TokenKey)
}
// 设置token
export function setToken(key){
    return cookie.set(TokenKey,key)
}

// 清楚token
export function removeToken(){
    return cookie.remove(TokenKey)
}

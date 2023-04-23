import { createStore } from 'vuex'
import { loginApi, getInfo } from '~/api/login/index.js'
import { removeToken, setToken } from "~/utils/cookies"

const store = createStore({
    state () {
      return {
        //用户信息
        user:{}
      }
    },
    mutations: {
        //记录用户信息
        SET_USERINFO(state,user){
            state.user = user
        }
    },
    actions:{
        // 登录
        login({ commit }, { username, password }){
            return new Promise((resolve,reject)=>{
                loginApi(username,password).then(res=>{
                    setToken(res.token)

                    resolve(res)
                }).catch(err=>reject(err))
            })
        },
        //获取当前登陆用户信息
        getinfo({ commit }){
            return new Promise((resolve,reject)=>{
                getInfo().then(res=>{
                    commit("SET_USERINFO",res)
                    // commit("SET_MENUS",res.menus)
                    // commit("SET_RULENAMES",res.ruleNames)
                    resolve(res)
                }).catch(err=>reject(err))
            })
        },
        // 退出登录
        logout({ commit }){
            // 移除cookie里的token
            removeToken()
            // 清除当前用户状态 vuex
            commit("SET_USERINFO",{})
        }
    }
  })

  export default store
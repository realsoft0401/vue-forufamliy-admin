import { createStore } from 'vuex'
import { loginApi, getInfo } from '~/api/login/index.js'

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
        //获取当前登陆用户信息
        getinfo({ commit }){
            getInfo().then(res=>{
                return new Promise((resolve,reject)=> {
                    commit("SET_USERINFO",res)
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            })
        }
    }
  })

  export default store
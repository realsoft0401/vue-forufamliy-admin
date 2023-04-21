<template>
    <div>后台首页</div> {{ $store.state.user.username }}
    <el-button @click="handlelogout">退出登陆</el-button>
</template>

<script setup>
import { showMessageBox } from '~/utils/messagebox'
import { removeToken } from "~/utils/cookies"
import { notification } from '~/utils/notification'
import { useRouter } from 'vue-router'
import { logOut } from '~/api/login'
import { useStore } from 'vuex'

const router = useRouter()

const store = useStore()

function handlelogout(){
    showMessageBox("提示", "是否退出该系统").then(res=>{
       // console.log(res);
       logOut().finally(() => {
            //移除cookie 里的 token
            removeToken()
            // 清除当前用的状态 vuex
            store.state.user = ''
            //跳转回登陆页面
            router.push('/')
            //提示退出成功
            notification("提示", "用户退出成功！")
       })
    })
}
</script>
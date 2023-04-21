<template>
    <div class="f-head">
        <span class="logo">
            <el-icon class="mr-2"><ElementPlus /></el-icon>
            福佑家和后台系统
        </span>
        <el-icon class="icon-btn"><Fold /></el-icon>
        <el-icon><Refresh /></el-icon>
        <div class="ml-auto flex items-center">
            <el-icon class="icon-btn"><FullScreen /></el-icon>

            <el-dropdown class="dropdown" @command="handleCommand">
                <span class="flex items-center text-light-50">
                <el-avatar :size="25" :src="$store.state.user.avatar" class="mr-2"/>
                  {{$store.state.user.username}}
                  <el-icon class="el-icon--right">
                    <arrow-down />
                  </el-icon>
                </span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="rePassword">修改密码</el-dropdown-item>
                    <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>

        </div>
    </div>
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

const handleCommand = (c) => {
    switch(c){
        case "logout":
        handlelogout()
            break;
        case "rePassword":
            break;
        default:
            break;
    }
}

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
<style scoped>
.f-head{
    @apply flex bg-indigo-600 text-light-50 fixed top-0 left-0 right-0 items-center;
    height: 64px;
}
.logo{
    width: 250px;
    @apply flex justify-center items-center text-xl font-thin;
}
.icon-btn{
    @apply flex justify-center items-center;
    width: 42px;
    height: 64px;
    cursor: pointer;
}

.icon-btn:hover {
    @apply bg-indigo-500;
}
.f-head .dropdown{
    height: 64px;
    cursor: pointer;
    @apply flex justify-center items-center mx-5;
}
</style>
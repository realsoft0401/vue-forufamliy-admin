<template>
    <div class="f-head">
        <span class="logo">
            <el-icon class="mr-2"><ElementPlus /></el-icon>
            福佑家和后台系统
        </span>

        <el-tooltip class="box-item" effect="dark" content="折叠" placement="bottom">
        <el-icon class="icon-btn" @click="$store.commit('handleAsideWith')">
            <Fold v-if="$store.state.asideWith == '250px'"/>
            <Expand v-else/>
        </el-icon>
        </el-tooltip>

        <el-tooltip class="box-item" effect="dark" content="刷新" placement="bottom"> 
        <el-icon class="icon-btn" @click="handleRefresh"><Refresh /></el-icon>
        </el-tooltip>

        <div class="ml-auto flex items-center">
            <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
            <el-icon class="icon-btn" @click="toggle"> <FullScreen v-if='!isFullscreen'/><Aim v-else/> </el-icon> 
            </el-tooltip>

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

    <!--修改密码部分样式-->
    <form-drawer ref="FormDrawerRef" title="修改密码" destroyOnClose @submit="submitForm">
        <el-form :model="repasswordForm"  :rules="rules" ref="rePasswordRef" label-width="80px" size="small">
            
            <el-form-item prop="oldpassword" label="旧密码">
                <el-input v-model="repasswordForm.oldpassword" placeholder="请输入旧密码" show-password type="password">
                    <template #prefix>
                    <el-icon class="el-input__icon"><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="password" label="新密码">
                <el-input v-model="repasswordForm.password" placeholder="请输入新密码" show-password type="password">
                    <template #prefix>
                    <el-icon class="el-input__icon"><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>

            <el-form-item prop="repassword" label="确认密码">
                <el-input v-model="repasswordForm.repassword" placeholder="请输入确认密码" show-password type="password">
                    <template #prefix>
                    <el-icon class="el-input__icon"><Lock /></el-icon>
                    </template>
                </el-input>
            </el-form-item>

        </el-form>
    </form-drawer>
</template>
<script setup>
import FormDrawer from '~/components/FormDrawer.vue'
import { notification } from '~/utils/notification'
import { useFullscreen } from '@vueuse/core'
import { useRepassword, useLogout } from '~/views/layouts/components/FHeader.js'

const { isFullscreen, toggle } = useFullscreen()

const { 
    FormDrawerRef,
    repasswordForm,
    rePasswordRef,
    rules,
    submitForm,
    openRePasswordForm
} = useRepassword()

const {
    handlelogout
} = useLogout()

const handleCommand = (c) => {
    switch(c){
        case "logout":
        handlelogout()
            break;
        case "rePassword":
        openRePasswordForm()
            break;
        default:
        notification('错误提示', '操作方法不存在', 'error')
            break;
    }
}



function handleRefresh(){
    location.reload()
}


</script>
<style>
.f-head{
    @apply flex bg-indigo-600 text-light-50 fixed top-0 left-0 right-0 items-center;
    height: 64px;
    z-index: 1000;
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
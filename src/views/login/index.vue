<template>
    <el-row class="login-container">
        <el-col :lg="16" :md="12" class="left">
            <div>
                <div class="title">欢迎光临</div>
                <div class="title_sub">福佑家和后台演示系统它是由 Vue3 + Vite + Element-plus 集成</div>
            </div>
        </el-col>
        <el-col :lg="8" :md="12" class="right">
            <h2 class="system_name">
                后台演示系统
            </h2>
            <div class="system_name_login">
                <span class="line"></span>
                <span>帐号密码登录</span>
                <span class="line"></span>
            </div>

            <el-form :model="loginForm" class="w-[250px]" :rules="rules" ref="loginFormRef">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" placeholder="请输入用户名">
                        <template #prefix>
                        <el-icon class="el-input__icon"><User /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password" placeholder="请输入密码" show-password type="password">
                        <template #prefix>
                        <el-icon class="el-input__icon"><Lock /></el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm(loginFormRef)" round color="#626aef" class="w-[250px]">登 录</el-button>
                </el-form-item>
            </el-form>

        </el-col>
    </el-row>
</template>

<script setup>
import { reactive, ref } from 'vue'

// do not use same name with ref
const loginForm = reactive({
  username: '',
  password: '',
})


const rules = {
  username: [
    { required: true, message: '用户名不能为空', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '密码不能为空', trigger: 'blur' },
    { min: 6, message: '密码不少于6位', trigger: 'blur' },
  ],
}

//绑定验证窗体
 const loginFormRef = ref(null)

const submitForm = () =>{
    //验证结果
    loginFormRef.value.validate((valid)=>{
        console.log(valid)
    })
}


</script>
<style scoped>
.login-container{
    @apply min-h-screen bg-indigo-500
}
.login-container .left,.login-container .right {
    @apply flex items-center justify-center;
}
.login-container .right {
    @apply flex-col bg-indigo-50;
}
.login-container .left .title{
    @apply font-bold text-5xl text-light-50 mb-4;
}

.login-container .left .title_sub{
    @apply text-gray-200 text-sm;
}

.login-container .right .system_name {
    @apply font-bold text-3xl text-gray-800
}

.login-container .right .system_name_login{
    @apply flex items-center justify-center my-5 text-gray-300 space-x-2;
}

.login-container .right .line{
    @apply h-[1px] w-16 bg-gray-200;
}
</style>
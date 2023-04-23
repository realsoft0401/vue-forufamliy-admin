<template>
    <div class="f-head">
        <span class="logo">
            <el-icon class="mr-2"><ElementPlus /></el-icon>
            福佑家和后台系统
        </span>

        <el-tooltip class="box-item" effect="dark" content="折叠" placement="bottom">
        <el-icon class="icon-btn"><Fold /></el-icon>
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
    <el-drawer v-model="showdrawer" title="修改密码" size="45%" :close-on-click-modal="false">
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

            <el-form-item>
                <el-button type="primary" @click="submitForm(rePasswordRef)"  :loading="loading">提交</el-button>
            </el-form-item>
        </el-form>
    </el-drawer>

</template>
<script setup>
import { reactive, ref} from 'vue'
import { showMessageBox } from '~/utils/messagebox'
import { removeToken } from "~/utils/cookies"
import { notification } from '~/utils/notification'
import { useRouter } from 'vue-router'
import { logOut } from '~/api/login'
import { useStore } from 'vuex'
import { useFullscreen } from '@vueuse/core'
import { rePassword } from '~/api/admin/index.js'



const repasswordForm = reactive({
    oldpassword: '',
    password: '',
    repassword: '',
})

//注册drawer组件，修改密码部分
const showdrawer = ref(false)

const { isFullscreen, toggle } = useFullscreen()

const router = useRouter()

const store = useStore()

const handleCommand = (c) => {
    switch(c){
        case "logout":
        handlelogout()
            break;
        case "rePassword":
        showdrawer.value = true
            break;
        default:
        notification('错误提示', '操作方法不存在', 'error')
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

function handleRefresh(){
    location.reload()
}

const rules = {
    oldpassword: [
        { required: true, message: '旧密码不能为空', trigger: 'blur' },
        { min: 4, message: '密码不少于6位', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '新密码不能为空', trigger: 'blur' },
        { min: 4, message: '密码不少于6位', trigger: 'blur' },
    ],
    repassword: [
        { required: true, message: '确认密码不能为空', trigger: 'blur' },
        { min: 4, message: '密码不少于6位', trigger: 'blur' },
    ],
}

//绑定验证窗体
const rePasswordRef = ref(null)
const loading = ref(false)
const submitForm = () => {
    //验证结果
    rePasswordRef.value.validate((valid) => {
        if (!valid) {
            return false
        }
        loading.value = true
        rePassword(repasswordForm).then(res => {
            // 提示成功
            notification('修改成功', '修改密码成功', 'success')
            showdrawer.value = false
        }).finally(() => {
            loading.value = false
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
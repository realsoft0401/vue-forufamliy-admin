import { reactive, ref} from 'vue'
import { rePassword } from '~/api/admin/index.js'
import { notification } from '~/utils/notification'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { showMessageBox } from '~/utils/messagebox'

import { logOut } from '~/api/login'

export function useRepassword() {
    const router = useRouter()
    const store = useStore()
    //注册窗体drawer组件，修改密码部分
    const FormDrawerRef = ref(null)

    const repasswordForm = reactive({
        oldpassword: '',
        password: '',
        repassword: '',
    })

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
    const submitForm = () => {
        //验证结果
        rePasswordRef.value.validate((valid) => {
            if (!valid) {
                return false
            }
            //打开loading
            FormDrawerRef.value.showLoading()
            rePassword(repasswordForm).then(res => {
                // 提示成功
                notification('修改成功', '修改密码成功', 'success')
                store.dispatch("logout")
                router.push("/")
                //关闭窗体
                //FormDrawerRef.value.close()
            }).finally(() => {
                //关闭loading
                FormDrawerRef.value.hideLoading()
            })
        })
    }

    const openRePasswordForm = () =>{
        FormDrawerRef.value.open()
        console.log("openRePasswordForm");
    }

    return {
        FormDrawerRef,
        repasswordForm,
        rePasswordRef,
        rules,
        submitForm,
        openRePasswordForm
    }
}


export function useLogout(){
    const router = useRouter()
    const store = useStore()
    function handlelogout(){
        showMessageBox("提示", "是否退出该系统").then(res=>{
           // console.log(res);
           logOut().finally(() => {
                //提示退出成功
                notification("提示", "用户退出成功！")
                //移除cookie 里的 token
                store.dispatch("logout")
                //跳转回登陆页面
                router.push('/')
           })
        })
    }
    return { handlelogout }
}
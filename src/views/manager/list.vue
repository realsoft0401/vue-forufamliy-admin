<template>

    <el-card shadow="never" class="border-0">
        <!--新增 ｜ 刷新-->
        <div class="flex items-center justify-between mb -4">
            <el-button type="primary" size="small" @click="handleCreate">新增</el-button>
            <el-tooltip content="刷新数据" placement="top">
                <el-button @click="getManagerData">
                    <el-icon size="20"><Refresh /></el-icon>
                </el-button>
            </el-tooltip>
        </div>
        <div class="top p-3" >
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
            <el-table-column prop="id" label="ID" />
              <el-table-column prop="username" label="管理员">
                <template #default="{row}">
                    <div class="flex items-center">
                        <el-avatar :size="50" :src='row.avatar != "" ? row.avatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"' />
                    </div>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="状态" width="380" />
              <el-table-column prop="create_time" label="创建时间" width="180" />
              <el-table-column  label="操作" width="180" align="center">
                <template #default="scope">
                    <el-button text size="small" @click="handleEdit(scope.row.id, scope.row)">修改</el-button>


                    <el-popconfirm title="是否要删除该公告？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text class="px-1" type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                </template>
              </el-table-column>
            </el-table>
        </div>
            <div class="flex items-center justify-center mt-5">
                <el-pagination 
                background 
                layout="prev, pager, next" 
                :total="total" 
                :current-page="currentPage" 
                :page-size="limit" 
                @current-change="getManagerData"/>
            </div>

            <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
                <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                    <el-form-item label="公告标题" prop="title">
                        <el-input v-model="form.title" placeholder="公告标题"></el-input>
                    </el-form-item>
                    <el-form-item label="公告内容" prop="content">
                        <el-input v-model="form.content" placeholder="公告内容" type="textarea"></el-input>
                    </el-form-item>
                </el-form>
            </FormDrawer>
    </el-card>
</template>

<script setup>
import { reactive, ref, computed } from "vue"
import { getMaragerList } from "~/api/manager"
import FormDrawer from '~/components/FormDrawer.vue'
import { notification } from '~/utils/notification.js'

const tableData = ref([])
const currentPage =  ref(1)
const total = ref(0)
const limit = ref(10)

const loading = ref(false)

function getManagerData(p = null){
    if(typeof p == "number"){
        currentPage.value = p
    }
    const query = {
        limit: 10,
        keyword: null
    }
    loading.value = true
    getMaragerList(currentPage.value,  query).then((res)=>{
        console.log(res)
        total.value = res.totalCount
        tableData.value = res.list
    }).finally(()=>{
        loading.value = false
    })
}

getManagerData()

//表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
    title: '',
    content: ''
})

const drawerTitle = computed(()=>noticeId.value ? "修改公告" : "新增公告")

const noticeId =  ref(0)
const rules = {
    title: [{
        required: true,
        message: '请填写标题',
        trigger: 'blur'
    }],
    content: [{
        required: true,
        message: '请填写内容',
        trigger: 'blur'
    }]
}

const handleSubmit = () =>{
    formRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        console.log(noticeId.value);
        const fun =  noticeId.value ? editNoticeData(noticeId.value, form):createNoticeData(form)
        formDrawerRef.value.showLoading()
        fun.then(res=>{
            if(res){
                notification("添加成功", "公告添加成功", "success")
                getManagerData(currentPage.value)
                formDrawerRef.value.close()
            }else{
                notification("添加失败", "公告添加失败", "error")
                formDrawerRef.value.close()
            }
        }).finally(()=>{
            formDrawerRef.value.hideLoading()
        })
    })
}

//打开页面
const handleCreate = () => {
    noticeId.value = 0
    form.title = ""
    form.content = ""
    formDrawerRef.value.open()
}

const handleDelete = (id)=>{
    formDrawerRef.value.showLoading()
    delNoticeData(id).then(res =>{
        if(res){
                notification("删除成功", "公告删除成功", "success")
                getManagerData(currentPage.value)
                formDrawerRef.value.close()
            }else{
                notification("删除失败", "公告删除失败", "error")
                formDrawerRef.value.close()
            }
    }).finally(()=>{
            formDrawerRef.value.hideLoading()
        })
}

const handleEdit = (id, val) =>{
    //console.log(id);
    formDrawerRef.value.open()
    form.title = val.title
    form.content = val.content
    noticeId.value = id
}

// function restForm(row=false){
//     if(formRef.value) form.value.clearValidate()
//     if(row){
//         for(const key in form){
//             form[key] = row[key]
//         }
//     }
// }
</script>
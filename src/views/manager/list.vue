<template>
    <el-card shadow="never" class="border-0">

    <!-- 搜索 -->
    <el-form :model="searchForm"  label-width="80px" class="mb-3" size="small">
        <el-row>
            <el-col :span="8" :offset="0">
                <el-form-item label="关键词">
                    <el-input v-model="searchForm.keyword" placeholder="管理员昵称" clearable></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8" :offset="8">
                <div class="flex items-center justify-end">
                    <el-button type="primary" @click="getManagerData">搜索</el-button>
                    <el-button type="primary" @click="restSearchForm">重置</el-button>
                </div>
            </el-col>
        </el-row>
    </el-form>

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
            <el-table-column label="ID" width="180">
                <template #default="{ row }">
                    <div class="ml-3">
                    <h6>{{ row.username }}</h6>
                    <small>ID:{{ row.id }}</small>
                    </div>
                </template>
            </el-table-column>
              <el-table-column prop="username" label="管理员" width="220">
                <template #default="{row}">
                    <div class="flex items-center">
                        <el-avatar :size="50" :src='row.avatar != "" ? row.avatar : "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"' />
                    </div>
                </template>
              </el-table-column>
              <el-table-column label="所属管理组" width="200">
                <template #default="{row}">
                    {{ row.role?.name || '-' }}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="180">
                <template #default="{row}">
                    <el-switch :model-value="row.status" :active-value="1" :inactive-value="0" @change="handelchangeStatus($event,row)" :loading="row.statusLoading" :disabled="row.super == 1"/>
                </template>
              </el-table-column>
              <el-table-column prop="create_time" label="创建时间" />
              <el-table-column  label="操作"  align="center">
                <template #default="scope">
                    <small v-if='scope.row.super==1' class="text-sm text-gray-500">暂无操作</small>
                    <div v-else>
                    <el-button text size="small" @click="handleEdit(scope.row.id, scope.row)">修改</el-button>
                    <el-popconfirm title="是否要删除该管理员？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text class="px-1" type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                    </div>
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
                <el-form :model="form" ref="formRef" :rules="rules" label-width="100px" :inline="false">
                    <el-form-item label="用户名称" prop="username" >
                        <el-input v-model="form.username" placeholder="用户名称"></el-input>
                    </el-form-item>
                    <el-form-item label="用户密码" prop="password" >
                        <el-input v-model="form.password" placeholder="用户密码" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="用户头像" prop="avatar" >
                        <ChooseImage v-model="form.avatar"/>
                    </el-form-item>
                    <el-form-item label="所属管理组" prop="role_id" >
                        <el-select v-model="form.role_id" placeholder="选择所属管理组">
                            <el-option v-for="item in roles" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="用户状态" prop="status" >
                        <el-switch v-model="form.status" :active-value="1" :inactive-value="0"></el-switch>
                    </el-form-item>
                </el-form>
            </FormDrawer>
    </el-card>
</template>

<script setup>
import { reactive, ref, computed } from "vue"
import { getMaragerList, delManagerData, editManagerStatus, addManager, editManager } from "~/api/manager"
import FormDrawer from '~/components/FormDrawer.vue'
import ChooseImage from '~/components/ChooseImage.vue'
import { notification } from '~/utils/notification.js'

const searchForm =  reactive({
    keyword: ''
})

const roles = ref([])
const tableData = ref([])
const currentPage =  ref(1)
const total = ref(0)
const limit = ref(10)

const loading = ref(false)

function getManagerData(p = null){
    if(typeof p == "number"){
        currentPage.value = p
    }

    const keyword =  searchForm.keyword != '' ? searchForm.keyword : ''

    const query = {
        limit: 10,
        keyword: keyword
    }
    loading.value = true
    getMaragerList(currentPage.value, query).then((res)=>{
        total.value = res.totalCount
        tableData.value = res.list.map(o=>{
            o.statusLoading =  false
            return o
        })
        roles.value =  res.roles
    }).finally(()=>{
        loading.value = false
    })
}

getManagerData()

//表单部分
const formDrawerRef = ref(null)
const formRef = ref(null)
const form = reactive({
    username: '',
    password: '',
    role_id: null,
    status: 1,
    avatar: ''
})

const drawerTitle = computed(()=>managerId.value ? "修改管理员" : "新增管理员")

const managerId =  ref(0)
const rules = {
    username: [{
        required: true,
        message: '请填写用户名称',
        trigger: 'blur'
    }],
    role_id: [{
        required: true,
        message: '请选择所属管理组',
        trigger: 'blur'
    }]
}

const handleSubmit = () =>{
    formRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        console.log(managerId.value);
        const fun =  managerId.value ? editManager(managerId.value, form):addManager(form)
        formDrawerRef.value.showLoading()
        fun.then(res=>{
            if(res){
                notification(drawerTitle.value + "成功", drawerTitle.value + "成功", "success")
                getManagerData(currentPage.value)
                formDrawerRef.value.close()
            }else{
                notification(drawerTitle.value + "失败", drawerTitle.value + "失败", "error")
                formDrawerRef.value.close()
            }
        }).finally(()=>{
            formDrawerRef.value.hideLoading()
        })
    })
}

//打开页面
const handleCreate = () => {
    managerId.value = 0
    form.username = '',
    form.password = '',
    form.role_id = null,
    form.status = 1,
    form.avatar = ''
    formDrawerRef.value.open()
}

const handleDelete = (id)=>{
    formDrawerRef.value.showLoading()
    delManagerData(id).then(res =>{
        if(res){
                notification("删除成功", "用户成功", "success")
                getManagerData(currentPage.value)
                formDrawerRef.value.close()
            }else{
                notification("删除失败", "用户失败", "error")
                formDrawerRef.value.close()
            }
    }).finally(()=>{
            formDrawerRef.value.hideLoading()
        })
}

const handleEdit = (id, val) =>{
    formDrawerRef.value.open()
    form.username = val.username
    form.password = val.password
    form.role_id = val.role_id,
    form.status = val.status,
    form.avatar = val.avatar
    managerId.value = id
}

const restSearchForm = () =>{
    searchForm.keyword = ''
    getManagerData()
}

const handelchangeStatus = (status, row) =>{
    row.statusLoading = true
    editManagerStatus(row.id, status).then(res=>{
        //console.log(res);
        if(res){
            notification("修改成功", "状态修改成功", "success")
            row.status =  status
        }
    }).finally(()=>{
        row.statusLoading = false
        })
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
<template>
    <el-aside width="200px" class="image-aside" v-loading="loading">
        <div class="top">
            <AsideList :active="activeId == item.id" v-for="(item, index) in list" :key="index" @edit="handleEdit(item)" @delete="handleDelete(item)" @click="handleChangeActiveId(item.id)">{{
                item.name }}</AsideList>
        </div>
        <div class="bottom">
            <el-pagination background layout="prev, next" :total="total" :current-page="currentPage" :page-size="limit"
                @current-change="getImageData" />
        </div>
    </el-aside>

    <FormDrawer :title="drawerTitle" ref="formDrawerRef" @submit="handleSubmit">
        <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
            <el-form-item label="分类名称" prop="name">
                <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="排序" prop="order">
                <el-input-number v-model="form.order" :min="0" :max="1000" />
            </el-form-item>
        </el-form>
    </FormDrawer>
</template>
<script setup>
import { computed, reactive, ref } from 'vue'
import AsideList from './AsideList.vue'
import { getImageClassList, createImageClass, editImageClass, delImageClass} from '~/api/image';
import FormDrawer from '~/components/FormDrawer.vue'
import { notification } from '~/utils/notification.js'
const list = ref([])
const loading = ref(false)
const activeId = ref(0)
const formDrawerRef = ref(null)
//分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)

const editId = ref(0)

const drawerTitle = computed(()=>editId.value ? "修改" : "新增")


const formRef = ref(null)

const form = reactive({
    name: "",
    order: 50
})

function getImageData(page = null) {
    if (typeof page == "number") {
        currentPage.value = page
    }
    loading.value = true
    getImageClassList(currentPage.value).then(res => {
        list.value = res.list
        let item = list.value[0]
        total.value = res.totalCount
        if (item) {
            handleChangeActiveId(item.id)
        }
    }).finally(() => {
        loading.value = false
    })
}
getImageData()

const rules = {
    name: [{
        required: true,
        message: '图库分类名称不能为空',
        trigger: 'blur'
    }]
}

const handleSubmit = () => {
    formRef.value.validate((valid) => {
        if (!valid) {
            return
        }
        const fun =  editId.value ? editImageClass(editId.value,form): createImageClass(form)
        formDrawerRef.value.showLoading()
        fun.then(res => {
            console.log(res);
            if (res) {
                notification(drawerTitle.value, "上传图片成功", "success")
                getImageData(editId.value ? currentPage.value : 1 )
                formDrawerRef.value.close()
            }
        }).finally(() => {
            formDrawerRef.value.hideLoading()
        })
    })
}
const handleCreate = () => {
    editId.value = 0
    form.name = ''
    form.order = 50
    formDrawerRef.value.open()
}


const handleEdit = (row) => {
    //console.log(row.name);
    editId.value = row.id
    form.name = row.name
    form.order = row.order
    formDrawerRef.value.open()

}

const handleDelete = (row)=>{
    // console.log(row)
    loading.value = true
    delImageClass(row.id).then(res=>{
            if(res){
            getImageData(row.id ? currentPage.value : 1 )
            notification("删除成功", "图库类型删除成功", "success")
        }
    }).finally(()=>{
        loading.value = false
    })
}

const emit = defineEmits(["change"])

function handleChangeActiveId(id){
    activeId.value = id
    emit("change", id)
}

defineExpose({
    handleCreate
})
</script>
<style>
.aside-list:hover,
.active {
    @apply bg-blue-50
}

.aside-list {
    border-bottom: 1px solid #f4f4f4;
    cursor: pointer;
    @apply flex items-center p-3 text-sm text-gray-600;
}

.image-aside {
    border-right: 1px solid #eee;
    position: relative;
}

.image-aside .top {
    position: absolute;
    right: 0;
    top: 0;
    left: 0;
    bottom: 50px;
    overflow-y: auto;
}

.image-aside .bottom {
    position: absolute;
    bottom: 0;
    height: 50px;
    left: 0;
    right: 0;
    @apply flex items-center justify-center;
}</style>
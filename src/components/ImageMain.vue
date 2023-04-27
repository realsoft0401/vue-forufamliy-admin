<template>
    <el-main class="image-main" v-loading="loading">
        <div class="top p-3">
            <el-empty v-if="list.length == 0 && !loading" description="暂无图片"></el-empty>
            <el-row :gutter="10">
              <el-col :span="6" :offset="0" v-for="(item,index) in list" :key="index">
                  <el-card shadow="hover" class="relative mb-3" :body-style="{ 'padding':0 }" :class="{ 'border-blue-500':item.checked }">
                    <el-image :src="item.url" fit="cover" class="h-[150px]" style="width: 100%;"
                    :preview-src-list="[item.url]"
                    :initial-index="0"></el-image>
                    <div class="image-title">{{ item.name }}</div>
                    <div class="flex items-center justify-center p-2">

                      <!-- <el-checkbox v-if="openChoose" v-model="item.checked" @change="handleChooseChange(item)"/> -->

                      <el-button type="primary" size="small" text @click="handleEdit(item)">重命名</el-button>

                      <el-popconfirm 
                      title="是否删除该图片？" 
                      confirmButtonText="确认" 
                      cancelButtonText="取消" 
                      @confirm="handleDelete(item.id)">
                          <template #reference>
                            <el-button class="!m-0" type="primary" size="small" text>删除</el-button>
                          </template>
                      </el-popconfirm>
                    </div>
                  </el-card>
              </el-col>
            </el-row>
            

        </div>
        <div class="bottom">
            <el-pagination 
            background 
            layout="prev,pager, next" 
            :total="total" 
            :current-page="currentPage" 
            :page-size="limit" 
            @current-change="getImgData"/>
        </div>
    </el-main>

    <el-drawer v-model="drawer" title="上传图片">
      <UploadFile :data="{ image_class_id }" @success="handleUploadSuccess"/>
    </el-drawer>

</template>

<script setup>
import { getImageList, editImgFile, delImgFile} from '~/api/image';
import { ref } from 'vue'
import { showPrompt } from '~/utils/messagebox.js'
import { notification } from '~/utils/notification.js'
import UploadFile from "~/components/UploadFile.vue"

//上传图片
const drawer = ref(false)
const openUploadFile = ()=>drawer.value = true

//分页
const currentPage = ref(1)
const total = ref(0)
const limit = ref(10)
const list =  ref([])
const loading =  ref(false)
const imageClassId =  ref(0)

function getImgData(){
    getImageList(imageClassId.value, currentPage.value).then((res)=>{
         console.log(res.list);
        list.value =  res.list
    })
}

const loadData = (id) =>{
    currentPage.value = 1
    imageClassId.value =  id
    getImgData()
}

// 重命名
const handleEdit = (item)=>{
  showPrompt("重命名",item.name)
  .then(({ value })=>{
    loading.value = true
    editImgFile(item.id,value)
    .then(res=>{
        notification("修改", "图片名修改成功", "success")
        getImgData()
    })
    .finally(()=>{
      loading.value = false
    })

  })
}

// 删除图片
const handleDelete = (id)=>{
  loading.value = true
  delImgFile([id]).then(res=>{
    notification("删除", "图片名删除成功", "success")
    getImgData()
  })
  .finally(()=>{
    loading.value = false
  })
}


defineExpose({
    loadData,
    openUploadFile
})
</script>
<style>
.image-main{
  position: relative;
}
.image-main .top{
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 50px;
  overflow-y: auto;
}
.image-main .bottom{
  position: absolute;
  bottom: 0;
  height: 50px;
  left: 0;
  right: 0;
  @apply flex items-center justify-center;
}
.image-title{
  position: absolute;
  top: 122px;
  left: -1px;
  right: -1px;
  @apply text-sm truncate text-gray-100 bg-opacity-50 bg-gray-800 px-2 py-1;
}
</style>
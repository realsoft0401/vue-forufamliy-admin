<template>
        <el-container class="bg-white rounded" :style="{ height: ( h + 'px') }">
          <el-header class="image-header">
            <el-button type="primary" size="small" @click="handleOpenCreate">新增图片分类</el-button>
            <el-button type="warning" size="small" @click="handleOpenUpload">上传图片</el-button>

          </el-header>
          <el-container>
 
                <ImageAside ref="ImagAsideRef" @change="handleAsideChange"/>
                <ImageMain ref="ImgMainRef"/>

          </el-container>
        </el-container>
</template>
<script setup>
import {ref} from "vue"
import ImageAside from '~/components/ImageAside.vue';
import ImageMain from '~/components/ImageMain.vue';
const windowHeight = window.innerHeight || document.body.clientHeight

const h = windowHeight - 64 - 44 - 40

const ImagAsideRef = ref(null)
const ImgMainRef = ref(null)

const handleOpenCreate = () => {
    ImagAsideRef.value.handleCreate()
}

const handleAsideChange = (imgClassId) =>{
  // console.log(imgClassId);
  ImgMainRef.value.loadData(imgClassId)
}

const handleOpenUpload = ()=>{
  ImgMainRef.value.openUploadFile()
}
</script>

<style>
 .image-header{
    border-bottom: 1px solid #eee;
    @apply flex items-center;
 }
</style>
<template>
    <el-drawer v-model="showdrawer" :title="title" :size="size" :close-on-click-modal="false" :destroy-on-close="destroyOnClose">
        <div class="formDrawer">
          <div class="body">
            <slot></slot>
          </div>
          <div class="actions">
            <el-form-item>
                <el-button type="primary" @click="submit"  :loading="loading">{{ confirmText }}</el-button>
                <el-button type="primary" @click="close">取消</el-button>
            </el-form-item>
          </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { ref } from 'vue'
//注册drawer组件，并初始化组件
const showdrawer = ref(false)
const loading = ref(false)

const showLoading = () =>{
    loading.value = true
}

const hideLoading = () =>{
    loading.value = false
}

const open = () => {
    showdrawer.value= true
}

const close = () => {
    showdrawer.value= false
}

const submit= ()=> emit('submit')

//向父组件暴露事件
const emit = defineEmits(['submit'])
//向父组件暴露参数
const props = defineProps({
    title: String,
    size: {
        type:String,
        default:'45%'
    },
    destroyOnClose: {
        type: Boolean,
        default: false
    },
    confirmText: {
        type:String,
        default:'提交'
    },

})
//向父组件暴露方法
defineExpose({
    open,
    close,
    showLoading,
    hideLoading
})
</script>

<style scoped>
    .formDrawer{
        width: 100%;
        height: 100%;
        position: relative;
        @apply flex flex-col;
    }
    .formDrawer .body{
        flex: 1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 50px;
        overflow-y: auto;

    }
    .formDrawer .actions{
        height: 50px;
        @apply mt-auto flex items-center;
    }
</style>
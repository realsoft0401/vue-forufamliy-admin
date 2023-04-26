<template>
    <el-card shadow="never">
        <template #header>
            <div class="flex justify-between">
                <span class="text-sm">订单统计</span>
                <div>
                    <el-check-tag v-for="(item, index) in options" :key="index" :checked="current==item.value" style="margin-right: 8px" @click="handChoose(item.value)">
                        {{ item.text }}
                    </el-check-tag>
                </div>
            </div>
        </template>
    </el-card>
</template>

<script setup>
    import { ref } from "vue"
    const current =  ref("week")
    const options = [{
    text: "近1个月",
    value: "month"
    }, {
        text: "近1周",
        value: "week"
    }, {
        text: "近24小时",
        value: "hour"
    }]

const handChoose=(type)=>{
    current.value =  type
}
</script>
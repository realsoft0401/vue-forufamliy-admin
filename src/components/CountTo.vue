<template>
    {{ d.num.toFixed(2) }}
</template>

<script setup>
import { reactive } from "vue"
import gsap from "gsap"

const d = reactive({
    num : 0
})

const props = defineProps({
    value:{
        type: Number,
        default: 0
    }
})

function AnimateToValue(){
    gsap.to(d,{
        duration: 1,
        num:props.value
    })
}
AnimateToValue()


</script>
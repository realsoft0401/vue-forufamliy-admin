<template>
    <div class="f-menu" :style="{ width: $store.state.asideWith }">
        <el-menu  unique-opened :default-active="defaultActive" class="border-0" @select="handleSelect" :collapse="isCollapse" :collapse-transition="false">
            <template v-for="(item,index) in asideMenu" :key="index">
                <el-sub-menu  v-if="item.child && item.child.length > 0" :index="item.name">
                    <template #title>
                      <el-icon><component :is="item.icon"></component></el-icon>
                      <span>{{ item.name }}</span>
                    </template>

                    <el-menu-item  v-for="(subitem,subindex) in item.child" :key="subindex" :index="subitem.frontpath">
                        <el-icon><component :is="subitem.icon"></component></el-icon>
                        <span>{{ subitem.name }}</span>
                    </el-menu-item>

                  </el-sub-menu>
                  <el-menu-item v-else :index="item.frontpath">
                    <el-icon><component :is="item.icon"></component></el-icon>
                    <span>{{ item.name }}</span>
                  </el-menu-item>
            </template>
      </el-menu>
    </div>
</template>


<script setup>
import { computed, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore} from 'vuex';

const store = useStore()

const router = useRouter()

const route = useRoute()

const asideMenu = computed(() => store.state.menus)

const handleSelect = (e)=>{
    router.push(e)
}

//是否折叠
const isCollapse = computed(()=>!(store.state.asideWith == '250px'))

//默认选中
const defaultActive = ref(route.path)

</script>
<style>
.f-menu {
    transition: all 0s;
    top: 64px;
    bottom: 0;
    left: 0;
    overflow-y: auto;
    overflow-x: hidden;
    @apply shadow-md fixed bg-light-50;
}
.f-menu::-webkit-scrollbar{
  width: 0px;
}
</style>
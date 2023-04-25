<template>
    <div class="common-layout">
      <el-container>
        <el-header><f-header /></el-header>
        <el-container>
          <el-aside :width="$store.state.asideWith"><f-menu /></el-aside>
          <el-container>
            <el-main>
                <f-tag-list />
                <router-view v-slot="{ Component }">
                  <transition name="fade"> <!--全局动画 实现动画模版必须是单节点就是模版只有一个<div>标签-->
                    <keep-alive :max="10">
                      <component :is="Component"></component>
                    </keep-alive>
                  </transition>
                </router-view>
            </el-main>
          </el-container>
        </el-container>
      </el-container>
    </div>
  </template>

<script setup>
import FHeader from './components/FHeader.vue'
import FMenu from './components/FMenu.vue'
import FTagList from './components/FTaglist.vue'
</script>
  
<style>
.e-aside{
  transition: all 0.2s;
}
.fade-enter-from{
  opacity: 0;
}
.fade-enter-to{
  opacity: 1;
}
.fade-leave-from{
  opacity: 1;
}
.fade-leave-to{
  opacity: 0;
}
.fade-enter-active, .fade-leave-active{
  transition: all 0.3s;
}
.fade-enter-active {
  transition-delay: 0.3s;
}
</style>
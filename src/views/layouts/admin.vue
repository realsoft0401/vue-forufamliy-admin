<template>
    <div class="common-layout">
      <el-container>
        <el-header><f-header /></el-header>
        <el-container>
          <el-aside :width="$store.state.asideWith"><f-menu /></el-aside>
          <el-container>
            <el-main>
                <f-tag-list />
                <router-view></router-view>
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
</style>
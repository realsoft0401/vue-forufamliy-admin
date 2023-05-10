<template>
    <div>
          <el-tabs v-model="searchForm.tab"  @tab-change="getData">
            <el-tab-pane :label="item.name" :name="item.key" v-for="(item, index) in tabbars" :key="index"></el-tab-pane>
          </el-tabs>


          <el-card shadow="never" class="border-0">
            <!-- 搜索 -->
            <Search :model="searchForm" @search="getData" @reset="resetSearchForm">
                <SearchItem label="关键词">
                  <el-input v-model="searchForm.title" placeholder="商品名称" clearable></el-input>
                </SearchItem>
            </Search>
        
            <!-- 新增|刷新 -->
            <ListHeader @create="handleCreate" @refresh="getData"/>
        
            <el-table :data="tableData" stripe style="width: 100%" v-loading="loading">
                <el-table-column type="selection" width="55" />
                <el-table-column label="商品" width="300">
                  <template #default="{ row }">
                    <div class="flex">
                      <el-image class="mr-3 rounded" :src="row.cover" fit="cover" :lazy="true" style="width:50px;height: 50px;">
                      </el-image>
                      <div class="flex-1">
                        <p>{{ row.title }}</p>
                        <div>
                          <span class="text-rose-500">￥{{ row.min_price }}</span>
                          <el-divider direction="vertical" />
                          <span class="text-gray-500 text-xs">￥{{ row.min_oprice }}</span>
                        </div>
                        <p class="text-gray-400 text-xs mb-1">分类:{{ row.category ? row.category.name : "未分类" }}</p>
                        <p class="text-gray-400 text-xs">创建时间：{{ row.create_time }}</p>
                      </div>
                    </div>
                  </template>
                </el-table-column>
              <el-table-column label="所属角色" align="center">
                <template #default="{ row }">
                  {{ row.role?.name || "-" }}
                </template>
              </el-table-column>
              <el-table-column label="状态" width="120">
                <template #default="{ row }">
                  <el-switch :modelValue="row.status" :active-value="1" :inactive-value="0" :loading="row.statusLoading" :disabled="row.super == 1"  @change="handleStatusChange($event,row)">
                  </el-switch>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="180" align="center">
                <template #default="scope">
                  <small v-if="scope.row.super == 1" class="text-sm text-gray-500">暂无操作</small>
                  <div v-else>
                    <el-button type="primary" size="small" text @click="handleEdit(scope.row)">修改</el-button>
        
                  <el-popconfirm title="是否要删除该管理员？" confirmButtonText="确认" cancelButtonText="取消" @confirm="handleDelete(scope.row.id)">
                        <template #reference>
                            <el-button text type="primary" size="small">删除</el-button>
                        </template>
                    </el-popconfirm>
                  </div>
                </template>
              </el-table-column>
            </el-table>
        
            <div class="flex items-center justify-center mt-5">
                <el-pagination background layout="prev, pager ,next" :total="total" :current-page="currentPage" :page-size="limit" @current-change="getData"/>
            </div>
        
            <FormDrawer ref="formDrawerRef" :title="drawerTitle" @submit="handleSubmit">
              <el-form :model="form" ref="formRef" :rules="rules" label-width="80px" :inline="false">
                <el-form-item label="用户名" prop="username">
                  <el-input v-model="form.username" placeholder="用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="form.password" placeholder="密码"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                  <ChooseImage v-model="form.avatar"/>
                </el-form-item>
                <el-form-item label="所属角色" prop="role_id">
                  <el-select v-model="form.role_id" placeholder="选择所属角色">
                    <el-option v-for="item in roles"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="状态" prop="status">
                  <el-switch v-model="form.status" :active-value="1" :inactive-value="0">
                  </el-switch>
                </el-form-item>
              </el-form>
            </FormDrawer>

          </el-card>

    </div>
</template>

<script setup>
import { ref } from "vue"
import ListHeader from "~/components/ListHeader.vue";
import FormDrawer from "~/components/FormDrawer.vue";
import ChooseImage from "~/components/ChooseImage.vue";
import Search from "~/components/Search.vue";
import SearchItem from "~/components/SearchItem.vue";

import {
  getGoodsList,
  updateGoodsStatus,
  createGoods,
  updateGoods,
  deleteGoods
} from "~/api/goods"

import { useInitTable,useInitForm } from '~/utils/useCommon.js'

const roles = ref([])

const {
  searchForm,
  resetSearchForm,
  tableData,
  loading,
  currentPage,
  total,
  limit,
  getData,
  handleDelete,
  handleStatusChange
} = useInitTable({
  searchForm:{
    title: "",
    tab: "all",
    category_id: null,
  },
  getList:getGoodsList,
  onGetListSuccess:(res)=>{
    tableData.value = res.list.map(o => {
        o.statusLoading = false
        return o
    })
    total.value = res.totalCount
    roles.value = res.roles
  },
  delete:deleteGoods,
  updateStatus:updateGoodsStatus
})

const {
  formDrawerRef,
  formRef,
  form,
  rules,
  drawerTitle,
  handleSubmit,
  handleCreate,
  handleEdit
} = useInitForm({
  form:{
    title: null, //商品名称
    category_id: null, //商品分类
    cover: null, //商品封面
    desc: null, //商品描述
    unit: "件", //商品单位
    stock: 100, //总库存
    min_stock: 10, //库存预警
    status: 1, //是否上架 0仓库1上架
    stock_display: 1, //库存显示 0隐藏1显示
    min_price: 0, //最低销售价
    min_oprice: 0 //最低原价
  },
  getData,
  update:updateGoods,
  create:createGoods
})

const tabbars = [{
  key: "all",
  name: "全部"
}, {
  key: "checking",
  name: "审核中"
}, {
  key: "saling",
  name: "出售中"
}, {
  key: "off",
  name: "已下架"
}, {
  key: "min_stock",
  name: "库存预警"
}, {
  key: "delete",
  name: "回收站"
}]

</script>
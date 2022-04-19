<script lang="ts" setup>
import { getUserList } from '@/api/user';
import { onMounted, ref } from '@vue/runtime-core';

const userList = ref([])

const queryUserList = async () => {
  const res = await getUserList({})
  console.log(res)
  userList.value = res.data.userList
}

onMounted(() => {
  queryUserList()
})

</script>

<template>
  <el-table :data="userList" style="width: 100%">
    <el-table-column prop="_id" label="_id" width="250" />
    <el-table-column prop="email" label="email" width="180" />
    <el-table-column prop="username" label="用户名" />
    <el-table-column prop="createdAt" label="创建时间">
      <template #default="scope">{{ scope.row.createdAt.slice(0, 10) }}</template>
    </el-table-column>
    <el-table-column prop="updatedAt" label="更新时间">
      <template #default="scope">{{ scope.row.updatedAt.slice(0, 10) }}</template>
    </el-table-column>
    <el-table-column label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small">detail</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
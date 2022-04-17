<script lang="ts" setup>
import { reactive } from "@vue/reactivity";
import { useStore } from 'vuex'
import { onMounted } from 'vue' 

const resourceList: [] = reactive([])
const handleClick = ():void => {}
const store = useStore()
onMounted(() => {
  console.log(store.state.userStore)
})
</script>


<template>
  home
  <el-table :data="resourceList" style="width: 100%">
    <el-table-column prop="date" label="Date" width="180" />
    <el-table-column prop="name" label="Name" width="180" />
    <el-table-column prop="address" label="Address" />
    <el-table-column fixed="right" label="Operations" width="120">
      <template #default>
        <el-button type="text" size="small" @click="handleClick">Detail</el-button>
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
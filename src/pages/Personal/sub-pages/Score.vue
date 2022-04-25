<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { getSignInList } from '@/api/user'

const scoreList = ref([])

const querySignInList = async () => {
  const res = await getSignInList()
  scoreList.value = res.data.data
}

onMounted(() => {
  querySignInList()
})
</script>

<template>
  <p>签到记录</p>
  <el-table :data="scoreList" style="width: 100%">
    <el-table-column prop="createdAt" label="签到时间">
      <template #default="scope">{{ scope.row.createdAt.slice(0, 10) }}</template>
    </el-table-column>
    <el-table-column prop="score" label="积分">
      <template #default="scope">{{ scope.row.current * 5 }}</template>
    </el-table-column>
  </el-table>
</template>
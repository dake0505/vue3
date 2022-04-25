<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { getSignInList } from '@/api/user'
import { useStore } from 'vuex'

const scoreList = ref([])
const store = useStore()

const currentScore = computed(() => {
  console.log(store.state)
  return store.state.userStore.userInfo.score
})

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
  <p>当前积分: {{ currentScore }}</p>
  <el-table :data="scoreList" style="width: 100%">
    <el-table-column prop="createdAt" label="签到时间">
      <template #default="scope">{{ scope.row.createdAt.slice(0, 10) }}</template>
    </el-table-column>
    <el-table-column prop="score" label="积分">
      <template #default="scope">{{ scope.row.current * 5 }}</template>
    </el-table-column>
  </el-table>
</template>
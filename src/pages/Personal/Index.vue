<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { getSignIn } from '@/api/user'
import { ElMessage } from 'element-plus'
import { } from '@vueuse/core'

const router = useRouter()

const onSignIn = async () => {
  const res = await getSignIn()
  ElMessage({
    message: res.data.msg,
    type: 'success'
  })
}

const handleSelect = (key: string, keyPath: string[]) => {
  router.push(`/personal${key}`)
}
</script>

<template>
  <el-row class="personal-page">
    <el-col :span="4">
      <el-menu
        @select="handleSelect"
      >
        <el-button @click="onSignIn">签到</el-button>
        <el-menu-item index="/score">我的积分</el-menu-item>
        <el-menu-item index="2">我的订单</el-menu-item>
        <el-menu-item index="3">我的地址</el-menu-item>
      </el-menu>
    </el-col>
    <el-col :span="20">
      <router-view />
    </el-col>
  </el-row>
</template>

<style lang="less" scoped>
.personal-page {
  height: 100%;
  .el-menu {
    height: 100%;
    .el-menu-item {
      justify-content: center;
    }
  }
}
</style>
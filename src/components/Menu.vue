<script lang="ts" setup>
import { ref, getCurrentInstance, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex';

const { proxy } = getCurrentInstance() as any
const router = useRouter()
const route = useRoute()
const store = useStore()

const activeIndex = ref('/home')
const handleSelect = (key: string, keyPath: string[]) => {
  router.push(key)
}
interface menuItem {
  path: string,
  title: string,
  name: string
}
const menuList = computed((): menuItem[]  => {
  const list:menuItem[] = []
  proxy.$router.options.routes.map((item: menuItem) => {
    if (!['login', 'register'].includes(item.name)) {
      list.push(item)
    }
  })
  return list
})

const isLogin = computed(() => {
  return route.name !== 'login'
})
const email = computed(() => {
  console.log(store.state.userStore)
  return store.state.userStore.userInfo.email
})

const onLogout = () => {
  router.push('/login')
}
</script>

<template>
  <el-menu
    v-if="isLogin"
    :default-active="activeIndex"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item v-for="item in menuList" :index="item.path">{{ item.title }}</el-menu-item>
    <slot>
      <el-popover
        placement="bottom"
        trigger="hover"
      >
      <div style="text-align: center;">
        <el-button type="text" @click="onLogout">退出登录</el-button>
      </div>
        <template #reference>
          <el-button type="text" style="position: absolute; right: 10px; top: 10px;">{{email}}</el-button>
        </template>
      </el-popover>
    </slot>
  </el-menu>
</template>
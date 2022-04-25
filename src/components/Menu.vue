<script lang="ts" setup>
import { ref, getCurrentInstance, computed, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex';

const { proxy } = getCurrentInstance() as any
const router = useRouter()
const route = useRoute()
const store = useStore()

let activeIndex = ref('/home')
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
    if (!['login', 'register', 'personal'].includes(item.name)) {
      list.push(item)
    }
  })
  return list
})

const isLogin = computed(() => {
  return route.name !== 'login'
})
const email = computed(() => {
  return store.state.userStore.userInfo.email
})
const currentRoute = computed(() => {
  return route.path
})

watch(currentRoute, (newValue) => {
  activeIndex.value = newValue
}, { immediate: true })

const onLogout = () => {
  router.push('/login')
}
const onLinkPersonal = () => {
  router.push('/personal')
}
</script>

<template>
  <el-menu
    v-if="isLogin"
    :default-active="activeIndex"
    mode="horizontal"
    class="top-menu"
    @select="handleSelect"
  >
    <el-menu-item v-for="item in menuList" :index="item.path">{{ item.title }}</el-menu-item>
    <slot>
      <el-popover
        placement="bottom"
        trigger="hover"
      >
      <div style="text-align: center; display: flex; flex-direction: column;">
        <el-button type="text" @click="onLinkPersonal">个人中心</el-button>
        <span></span>
        <el-button type="text" @click="onLogout">退出登录</el-button>
      </div>
        <template #reference>
          <el-button type="text" style="position: absolute; right: 10px; top: 10px;">{{email}}</el-button>
        </template>
      </el-popover>
    </slot>
  </el-menu>
</template>

<style lang="less" scoped>
.top-menu {
  display: flex;
  justify-content: center;
}
</style>
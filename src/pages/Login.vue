<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user';

const name = ref('login')
const router = useRouter()
const loginForm = reactive({
  email: '',
  password: ''
})
const onLogin = async () => {
  try {
    const res = await login(loginForm)
    console.log(res)
    localStorage.setItem('ACCESS_TOKEN', res.data.token);
    // router.push('/home')
  } catch (error) {
    console.log(error)
  }
}
const onRegister = ():void => { router.push('/register') }
</script>

<template>
  {{ name }}
  <el-form :model="loginForm" label-width="120px" style="width: 500px; margin: 0 auto;">
    <el-form-item label="账号">
      <el-input v-model="loginForm.email" />
    </el-form-item>
    <el-form-item label="密码">
      <el-input v-model="loginForm.password" />
    </el-form-item>
  </el-form>
  <el-button type="primary" @click="onLogin">login</el-button>
  <el-button @click="onRegister">注册</el-button>
</template>

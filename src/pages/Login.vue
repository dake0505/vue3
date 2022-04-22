<script lang="ts" setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { login } from '@/api/user';
import { useStore } from 'vuex';

const name = ref('login')
const router = useRouter()
const store = useStore()
const loginForm = reactive({
  email: '',
  password: ''
})
const onLogin = async () => {
  try {
    const res = await login(loginForm)
    console.log(res)
    localStorage.setItem('ACCESS_TOKEN', res.data.token);
    store.commit('setUserInfo', res.data)
    router.push('/home')
  } catch (error) {
    console.log(error)
  }
}
const onRegister = ():void => { router.push('/register') }
</script>

<template>
  <div class="login-page">
    <div class="login-form-box">
      <el-form :model="loginForm" style="width: 300px; margin: 0 auto;">
        <el-form-item label="账号">
          <el-input v-model="loginForm.email" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="loginForm.password" />
        </el-form-item>
      </el-form>
      <div class="btn-box">
        <el-button type="primary" @click="onLogin">登录</el-button>
        <el-button @click="onRegister">注册</el-button>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.login-page {
  width: 100%;
  height: 100%;
  background: url('../assets/login-bg.jpeg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  .login-form-box {
    position: absolute;
    top: 40%;
    right: 20%;
    /deep/ .el-form-item__label {
      color: white;
    }
    .btn-box {
      display: flex;
      justify-content: space-around;
      .el-button {
        width: 100px;
      }
    }
  }
}
</style>

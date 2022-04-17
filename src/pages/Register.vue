<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const register = ref(0)
interface RegisterForm {
  email: string,
  password: string
}
const registerForm:RegisterForm = reactive({
  email: '',
  password: ''
})
const registerFormRef = ref<FormInstance>()
const passwordValidate = (rule: any, value: any, callback: any) => {
  /**
   * A-Z对应的unicode编码是65-90
   * a-z对应的unicode编码是97-122
   * chartCodeAt方法转换
   */
  if (value === '') {
    callback(new Error('请输入密码'))
  } else if (!(/\d/).test(value)) {
    callback(new Error('请包含数字'))
  } else if (!(/[a-z]/g).test(value)) {
    callback(new Error('请包含小写字母'))
  } else if (!(/[A-Z]/g).test(value)) {
    callback(new Error('请包含大写字母'))
  }
  else {
    callback()
  }
}
const registerRules = reactive({
  email: [
    { require: true, message: '请填写邮箱地址', trigger: 'blur' }
  ],
  password: [
    { validator: passwordValidate, trigger: 'blur' }
  ]
})
const router = useRouter()
const onRegister = () => {
  console.log(registerForm)
  ElMessage({
    message: '注册成功',
    type: 'success'
  })
  console.log(router)
  router.push('/login')
}
</script>

<template>
  注册
  <el-form
    ref="registerFormRef"
    :model="registerForm"
    :rules="registerRules"
    label-width="120px"
    class="register-form"
  >
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="registerForm.email" />
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="registerForm.password" />
    </el-form-item>
  </el-form>
  <el-button @click="onRegister">注册</el-button>
</template>

<style scoped>
.register-form {
  width: 500px;
  margin: 0 auto;
}
</style>

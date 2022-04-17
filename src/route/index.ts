import { createRouter, createWebHashHistory } from 'vue-router'

const Login = () => import('../pages/Login.vue')
const Home = () => import('../pages/Home.vue')
const Register = () => import('../pages/Register.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

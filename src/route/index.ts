import { createRouter, createWebHashHistory } from 'vue-router'

const Login = () => import('../pages/Login.vue')
const Home = () => import('../pages/Home.vue')
const Register = () => import('../pages/Register.vue')
const Resource = () => import('../pages/Resource.vue')
const UserManage = () => import('../pages/UserManage.vue')
const Warehouse = () => import('../pages/Warehouse.vue')

const routes = [
  {
    path: '/login',
    name: 'login',
    title: '登录',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    title: '首页',
    component: Home
  },
  {
    path: '/register',
    name: 'register',
    title: '注册',
    component: Register
  },
  {
    path: '/resource',
    name: 'resource',
    title: '资源列表',
    component: Resource
  },
  {
    path: '/user-manage',
    name: 'user-manage',
    title: '用户列表',
    component: UserManage
  },
  {
    path: '/ware-house',
    name: 'ware-house',
    title: '我的仓库',
    component: Warehouse
  }
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})

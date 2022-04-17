import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import { router } from './route/index'
// import api from './utils/axios/api'
import store from './store'
import { Request } from './utils/request'

const app = createApp(App)
Request.init()

app.use(ElementPlus)
app.use(router)
// app.use(api)
app.use(store)
app.mount('#app')

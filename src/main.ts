import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import "@/permission"
import 'element-plus/packages/theme-chalk/src/base.scss';

createApp(App)
.use(createPinia())
.use(router)
.use(store)
.mount('#app')
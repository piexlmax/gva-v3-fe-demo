import { createApp } from 'vue'
import App from './App.vue'
import router from "@/router"
import store from "@/store"
import "@/permission"
import { ElButton, ElSelect,ElInput,ElForm,ElFormItem } from 'element-plus';
import 'element-plus/packages/theme-chalk/src/base.scss';

createApp(App)
.component(ElButton.name,ElButton)
.component(ElInput.name,ElInput)
.component(ElSelect.name,ElSelect)
.component(ElForm.name,ElForm)
.component(ElFormItem.name,ElFormItem)
.use(router)
.use(store)
.mount('#app')
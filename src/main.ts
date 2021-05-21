import { createApp } from 'vue';
import App from './App.vue';
import router from "@/router";
import store from "@/store";
import "@/permission";
// import { ElButton, ElSelect,ElInput,ElForm,ElFormItem } from 'element-plus';
import { setupElementPlus } from './style/registerElementPlus';
import 'element-plus/packages/theme-chalk/src/base.scss';

const app = createApp(App);
setupElementPlus(app);
app.use(router)
    .use(store)
    .mount('#app');
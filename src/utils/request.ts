import axios from 'axios'; // 引入axios
import { ElMessage } from 'element-plus';
import { store } from '@/store/index'
import Bus from "@/utils/bus";
import router from '@/router/index'
const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API as string,
    timeout: 99999
})

let acitveAxios:number = 0
let timer: NodeJS.Timeout
const showLoading = () => {
    acitveAxios++
    if (timer) {
        clearTimeout(timer)
    }
    timer = setTimeout(() => {
        if (acitveAxios > 0) {
            Bus.emit("showLoading")
        }
    }, 400);
}

const closeLoading = () => {
    acitveAxios--
    if (acitveAxios <= 0) {
        clearTimeout(timer)
        Bus.emit("closeLoading")
    }
}

    //http request 拦截器
service.interceptors.request.use(
    config => {
        console.log(config)
        return config;
    },
    error => {
        ElMessage({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error;
    }
);


//http response 拦截器
service.interceptors.response.use(
    response => {
        return response.data
    },
    error => {
        ElMessage({
            showClose: true,
            message: error,
            type: 'error'
        })
        return error
    }
)

export default service

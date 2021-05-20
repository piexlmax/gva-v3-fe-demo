import axios from 'axios'; // 引入axios
import { ElMessage } from 'element-plus';

const service = axios.create({
    baseURL: import.meta.env.VITE_BASE_API as string,
    timeout: 99999
})

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
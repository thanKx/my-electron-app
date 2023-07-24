import axios from "axios";
import {ElMessage} from "element-plus";

const serviceRequest  = axios.create({
    baseURL: 'http://localhost:8000',
    timeout: 60000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
})

// 请求拦截器
serviceRequest.interceptors.request.use(
    function (config:any) {
        console.log("request interceptors fulfilled ......")
        return config
    },
    function(error) {
        console.log("request interceptors error ......")
        return Promise.reject(error)
    }
)

// 响应拦截器
serviceRequest.interceptors.response.use(
    function (response) {
        console.log("response interceptors fulfilled .... ")

        // 未设置状态码则默认成功状态
        const code = response.data.code || 200;

        // 获取错误信息
        const msg = response.data.msg

        if ( code !== 200) {
            ElMessage({ message : '😂, 请求失败了', type: "error"})
            return Promise.reject(new Error(msg))
        }

        return response.data;
    },
    function (error) {
        console.log("response interceptors error ......")
        ElMessage.error("😂请求失败了 : " + error.message)
        return Promise.reject(error);
    }
)

export default serviceRequest
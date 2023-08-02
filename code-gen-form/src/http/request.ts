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
        return config
    },
    function(error) {
        return Promise.reject(error)
    }
)

// 响应拦截器
serviceRequest.interceptors.response.use(
    function (response) {

        console.log(response)

        // 未设置状态码则默认成功状态
        const status = response.status || 200;

        if ( status !== 200 ) {
            return Promise.reject(new Error("😂, 服务异常了，请联系管理员。"))
        }

        // 获取错误信息
        const msg = response.data.msg
        const code = response.data.code

        if ( code !== 200) {
            ElMessage({ message : '😂, 请求失败了', type: "error"})
            return Promise.reject(new Error(msg))
        }

        return Promise.resolve(response.data);
    },
    function (error) {
        ElMessage.error("😂请求失败了 : " + error.message)
        return Promise.reject(error);
    }
)

export default serviceRequest
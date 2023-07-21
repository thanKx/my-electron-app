import axios from "axios";

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
        return response;
    },
    function (error) {
        return Promise.reject(error);
    }
)

export default serviceRequest
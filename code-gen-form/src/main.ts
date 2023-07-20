// main.ts
import { createApp } from 'vue'
import App from './App.vue'

// 引入element-plus
import ElementPlus from 'element-plus'
// 引入element-plus 样式
import 'element-plus/dist/index.css'
// 引入element-plus 国际化
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

// 路由
import router from './router'

createApp(App)
    .use(router)
    .use(ElementPlus, {locale: zhCn})
    .mount('#app')
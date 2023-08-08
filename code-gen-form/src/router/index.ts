import {createRouter, createWebHashHistory, RouteRecordRaw} from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/form',
        component: () => import('../src/Form.vue')
    },
    {
        path: '/model',
        component: () => import('../src/Model.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router

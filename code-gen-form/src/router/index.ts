import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        component: () => import('../components/Home.vue')
    },
    {
        path: '/form',
        component: () => import('../components/Form.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router

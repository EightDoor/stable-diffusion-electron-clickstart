import Layout from "@/layout/index.vue";
import Home from "@/views/home.vue";

import {createRouter, createWebHistory} from 'vue-router';
import NotFound from "@/components/NotFound.vue";
import Model from "@/views/model/index.vue"
import CommunicationGroups from '@/views/communication_groups/index.vue';
import About from '@/views/about/index.vue';

const routes = [
    {
        path: "/",
        component: Layout,
        redirect: "/home",
        children: [
            {
                path: "home",
                component: Home
            },
            {
                path: "model",
                component: Model
            },
            {
                path: "communicationGroups",
                component: CommunicationGroups
            },
            {
                path: "about",
                component: About
            },
        ]
    },
    {path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound},
]

const router = createRouter({
    // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
    history: createWebHistory(),
    routes, // `routes: routes` 的缩写
})

export default router
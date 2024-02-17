import {createApp} from 'vue';
import App from './renderer/App.vue';
import './renderer/assets/base.scss'
import "normalize.css"
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'

import {createPinia} from 'pinia';

import Vuei18n from '@/language';

import router from "@/router/index";

const pinia = createPinia();
const app = createApp(App)

app.use(router)
    .use(pinia)
    .use(Vuei18n)
app.mount('#app');

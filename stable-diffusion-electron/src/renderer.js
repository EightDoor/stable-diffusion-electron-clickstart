import {createApp} from 'vue';
import App from './renderer/App.vue';
import './renderer/assets/base.scss'
import "normalize.css"
import 'element-plus/dist/index.css'
import Vuei18n from '@/language';

import router from "@/router/index";

const app = createApp(App)
app.use(router)
    .use(Vuei18n)
app.mount('#app');

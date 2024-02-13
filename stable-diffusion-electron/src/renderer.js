import {createApp} from 'vue';
import App from './renderer/App.vue';
import './renderer/assets/base.scss'
import "normalize.css"
import router from "@/router/index";

const app = createApp(App)
app.use(router)
app.mount('#app');

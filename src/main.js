import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import '../node_modules/bootstrap-icons/font/bootstrap-icons.css';
import "../src/assets/import.css";

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

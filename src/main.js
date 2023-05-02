import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { registerPlugins } from '@/plugins/index.js'
import './style.css'
import App from './App.vue'
import Home from '@/views/Home.vue'
import Post from '@/views/Post.vue'
import Dashboard from '@/views/Dashboard.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/dashboard', component: Dashboard },
    { path: '/artikel/:id', component: Post },
    { path: '/:pathMatch(.*)*', redirect: '/' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

const app = createApp(App)
// registerPlugins(app)
app.use(router)
app.mount('#app')

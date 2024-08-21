import { createApp } from 'vue'
import '@/assets/base.css'
import App from './app.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router/auto'
import routes from '~pages'

routes.push({
  path: '/',
  redirect: '/sidepanel',
})

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
})

createApp(App).use(router).use(createPinia()).mount('#app')

// console.log(router.getRoutes())

self.onerror = function (message, source, lineno, colno, error) {
  console.info(
    `Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${error}`
  )
}

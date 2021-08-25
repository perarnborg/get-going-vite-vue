import { createRouter, createWebHistory } from 'vue-router'

import HomeRoute from './routes/home/HomeRoute.vue'
import InfoRoute from './routes/info/InfoRoute.vue'
import NotFoundRoute from './routes/404/NotFoundRoute.vue'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: HomeRoute
    },
    {
      path: '/info',
      component: InfoRoute
    },
    {
      path: "/:catchAll(.*)",
      component: NotFoundRoute
    }
  ],
})

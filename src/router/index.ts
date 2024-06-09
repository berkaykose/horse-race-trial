import { createRouter, createWebHistory } from 'vue-router'
import RaceView from '../views/RaceView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: RaceView
    },
  ]
})

export default router

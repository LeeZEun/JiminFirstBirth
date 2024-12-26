import HomePage from '@/pages/HomePage.vue'
import LandingPage from '@/pages/LandingPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/',
      name: 'land',
      component: LandingPage,
    },
  ],
})

export default router

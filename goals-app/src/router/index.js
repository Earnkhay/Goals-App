import pinia from '../stores/store'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore'
import HomeView from '../views/HomeView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})


const store = useAuthStore(pinia)

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && !store.isAuthenticated) {
    next({ name: 'login' })
    alert('not authorized')
    return
  } else {
    next()
  }
})

export default router

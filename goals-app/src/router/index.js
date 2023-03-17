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
      // beforeEnter: (to, from, next) => {
      //   const store = useAuthStore(pinia)
      //   if (store.isAuthenticated) {
      //     next()
      //   }else {
      //     next('/login')
      //   }
      // }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const store = useAuthStore(pinia)
  if (to.name !== 'login' && !store.isAuthenticated) {
    next({ name: 'login' })
  } else if (to.name === 'login' && store.isAuthenticated) {
    next({ path: '/' })
  } else {
    next()
  }
})


export default router

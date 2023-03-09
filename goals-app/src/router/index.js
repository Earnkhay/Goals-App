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
      // meta: { requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    }
  ]
})


// router.beforeEach((to, from, next) => {
//   const store = useAuthStore(pinia)
//   if (to.name !== 'login' && !store.isAuthenticated) {
//     // store.logout()
//     next({ name: 'login' })
//   } else{
//     next()
//   }
// })

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

// router.beforeEach(async (to, from, next) => {
//   const store = useAuthStore(pinia)
//   if (to.meta.requiresAuth && !store.isAuthenticated) {
//     next('/'); // redirect to login page if not authenticated
//   } else {
//     next(); // allow access to the route
//   }
// });

// router.beforeEach((to, from, next) => {
//   if(to.name !== 'login' && !store.isAuthenticated) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// })

// router.beforeEach((to, from, next) => {
//   const store = useAuthStore(pinia)
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (!store.isAuthenticated) {
//       next({ name: "login" });
//       return
//     } else {
//       next();
//     }
//   } else {
//     next();
//   }
// })
// router.beforeEach(async (to, from, next) => {
//   const store = useAuthStore(pinia)
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (store.isAuthenticated) {
//       next();
//       return
//     }else{
//       next("/login")
//     }
//   } else {
//     next();
//   }
// })

export default router

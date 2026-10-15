import { createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home/ui/HomePage.vue'),
      meta: { title: 'Головна', layout: 'default' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about/ui/AboutPage.vue'),
      meta: { title: 'Про автора', layout: 'default' },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/pages/users/ui/UsersPage.vue'),
      meta: { title: 'Користувачі', layout: 'default', requiresAuth: true },
    },
    {
      path: '/users/new',
      name: 'user-create',
      component: () => import('@/pages/user-create/ui/UserCreatePage.vue'),
      meta: { title: 'Додати користувача', layout: 'default', requiresAuth: true },
    },
    {
      path: '/users/:id',
      name: 'user-details',
      component: () => import('@/pages/user-details/ui/UserDetailsPage.vue'),
      props: true,
      meta: { title: 'Деталі користувача', layout: 'default', requiresAuth: true },
    },
    {
      path: '/users/:id/edit',
      name: 'user-edit',
      component: () => import('@/pages/user-edit/ui/UserEditPage.vue'),
      props: true,
      meta: { title: 'Редагування користувача', layout: 'default', requiresAuth: true },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/ui/LoginPage.vue'),
      meta: { title: 'Вхід', layout: 'auth' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found/ui/NotFoundPage.vue'),
      meta: { title: 'Сторінку не знайдено', layout: 'default' },
    },
  ],
})

router.beforeEach((to) => {
  const session = useSessionStore()

  if (to.meta.requiresAuth && !session.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && session.isAuthenticated) {
    return { name: 'users' }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | Vue Lottery`
})

export default router

import { RouterView, createRouter, createWebHistory } from 'vue-router'
import { useSessionStore } from '@/entities/session'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/pages/home'),
      meta: { title: 'Головна', layout: 'default' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/pages/about'),
      meta: { title: 'Про автора', layout: 'default' },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/pages/users'),
      meta: { title: 'Користувачі', layout: 'default', requiresAuth: true },
    },
    {
      path: '/users/new',
      name: 'user-create',
      component: () => import('@/pages/user-create'),
      meta: { title: 'Додати користувача', layout: 'default', requiresAuth: true },
    },
    {
      path: '/users/:id',
      component: RouterView,
      meta: { title: 'Користувач', layout: 'default', requiresAuth: true },
      children: [
        {
          path: '',
          name: 'user-details',
          component: () => import('@/pages/user-details'),
          props: true,
          meta: { title: 'Деталі користувача', layout: 'default', requiresAuth: true },
        },
        {
          path: 'edit',
          name: 'user-edit',
          component: () => import('@/pages/user-edit'),
          props: true,
          meta: { title: 'Редагування користувача', layout: 'default', requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login'),
      meta: { title: 'Вхід', layout: 'auth' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/pages/not-found'),
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

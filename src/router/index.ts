import { RouterView, createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
      meta: { title: 'Головна', layout: 'default' },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
      meta: { title: 'Про автора', layout: 'default' },
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('@/views/UsersView.vue'),
      meta: { title: 'Користувачі', layout: 'default', requiresAuth: true },
    },
    {
      path: '/users/new',
      name: 'user-create',
      component: () => import('@/views/UserCreateView.vue'),
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
          component: () => import('@/views/UserDetailsView.vue'),
          props: true,
          meta: { title: 'Деталі користувача', layout: 'default', requiresAuth: true },
        },
        {
          path: 'edit',
          name: 'user-edit',
          component: () => import('@/views/UserEditView.vue'),
          props: true,
          meta: { title: 'Редагування користувача', layout: 'default', requiresAuth: true },
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { title: 'Вхід', layout: 'auth' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Сторінку не знайдено', layout: 'default' },
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.name === 'login' && auth.isAuthenticated) {
    return { name: 'users' }
  }
})

router.afterEach((to) => {
  document.title = `${to.meta.title} | Vue Lottery`
})

export default router

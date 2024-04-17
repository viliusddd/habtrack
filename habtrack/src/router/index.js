import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  {
    path: '/day/:date',
    name: 'DayView',
    component: () => import('@/views/HomeView.vue'),
    props: route => ({ ...route.params, date: route.params.date })
  },
  {
    path: '/habbit/:id',
    name: 'HabbitView',
    component: () => import('@/views/HabbitView.vue'),
    props: route => ({ ...route.params, id: parseInt(route.params.id) })
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active-day',
  routes
})

export default router

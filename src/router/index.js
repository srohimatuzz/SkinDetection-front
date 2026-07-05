import { createRouter, createWebHistory } from 'vue-router'

import LoginView     from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import ScanView      from '@/views/ScanView.vue'
import ResultView    from '@/views/ResultView.vue'
import HistoryView   from '@/views/HistoryView.vue'
import GuideView     from '@/views/GuideView.vue'
import AboutView     from '@/views/AboutView.vue'

const routes = [
  { path: '/',          redirect: '/login' },
  { path: '/login',     name: 'login',     component: LoginView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/scan',      name: 'scan',      component: ScanView },
  { path: '/result',    name: 'result',    component: ResultView },
  { path: '/history',   name: 'history',   component: HistoryView },
  { path: '/guide',     name: 'guide',     component: GuideView },
  { path: '/about',     name: 'about',     component: AboutView },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
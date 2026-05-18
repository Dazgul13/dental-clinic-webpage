import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import ServiceDetail from '../pages/ServiceDetail.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/service/:id', name: 'ServiceDetail', component: ServiceDetail, props: true }
]

const router = createRouter({ history: createWebHistory(), routes })
export default router

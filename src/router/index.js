import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // here i'm taking the lazyload approach for the routes
  // also setting up the default template for this group of pages,
  // incase if there were to be a dashboard the routes for that will be grouped in a different route file
  // e.g dashboardRoutes.js, then will be imported here to be added to the dashboard layout here.
  {
    path: '/',
    component: () => import('@/components/AppLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/Home.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

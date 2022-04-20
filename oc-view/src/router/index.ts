 import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

 const routes: Array<RouteRecordRaw> = [
   {
       path: '/',
       name: 'Home',
       meta: {
           title: '首页',
           keepAlive: true,
//            requireAuth: true
       },
       component: () => import('@/pages/index.vue')
   }
 ]

 const router = createRouter({
   history: createWebHistory(),
   routes
 });
 export default router;

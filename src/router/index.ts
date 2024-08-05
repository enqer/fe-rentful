import { createWebHistory, createRouter } from 'vue-router';
import Main from '@/views/Main.vue'


const routes = [
  {
    path: '/',
    component: Main,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



router.beforeEach(async (to, from, next) => {
  next();
}) 

export default router;
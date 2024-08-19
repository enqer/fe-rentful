import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/login',
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  next();
});

export default router;

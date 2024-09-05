import { createWebHistory, createRouter } from 'vue-router';
import Login from '@/views/Login.vue';
import Main from '@/views/Main.vue';
import Register from '@/views/Register.vue';
import Dashboard from '@/views/Dashboard.vue';
import Profile from '@/views/profile/Profile.vue';
import UserAddress from '@/views/profile/UserAddress.vue';
import UserPassword from '@/views/profile/UserPassword.vue';
import UserDetails from '@/views/profile/UserDetails.vue';

const routes = [
  {
    path: '/',
    component: Main,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  {
    path: '/profile',
    redirect: '/profile/details',
    name: 'Profile',
    component: Profile,
    children: [
      {
        path: '/profile/details',
        component: UserDetails,
      },
      {
        path: '/profile/address',
        component: UserAddress,
      },
      {
        path: '/profile/address-correspondence',
        component: UserAddress,
      },
      {
        path: '/profile/password',
        component: UserPassword,
      },
    ],
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

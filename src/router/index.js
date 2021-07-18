import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import Store from "../store";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/views/Registration.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/auth/Profile.vue'),
    meta: {
      roles: 'USER'
    }
  },
  {
    path: '/user/edit',
    name: 'updateUser',
    component: () => import('@/views/auth/UpdateUser.vue'),
    meta: {
      roles: 'USER'
    }
  },
  {
    path: '/user/change-password',
    name: 'updatePassword',
    component: () => import('@/views/auth/UpdatePassword.vue'),
    meta: {
      roles: 'USER'
    }
  },
  {
    path: '/user/status',
    name: 'deleteProfile',
    component: () => import('@/views/auth/DeleteProfile.vue'),
    meta: {
      roles: 'USER'
    }
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/auth/Users.vue'),
    meta: {
      roles: 'ADMIN'
    }
  },
  {
    path: '/users/:id/details',
    name: 'user-details',
    component: () => import('@/views/auth/UserDetails.vue'),
    meta: {
      roles: 'ADMIN'
    }
  },
  {
    path: '/401',
    name: 'Unauthorized',
    component: () => import('@/views/Unauthorized.vue')
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/NotFound.vue')
  },
  {
    path: '/:pathMatch(.*)*', //Unknow pages
    component: () => import('@/views/NotFound.vue'),
    redirect: '/404'
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkExactActiveClass: `active`,
  routes
});

router.beforeEach((to, from, next) => {
  const { roles } = to.meta;
  const currentUser = Store.getters["user"];

  if (roles){
    if (!currentUser) {
      console.log("Átiranyitas a login-ra mert nincs bejelentkezve.")
      return next({ path: "/login" });
    }
    if(roles =='ADMIN' && currentUser.roles.length < 2 ){
      return next({ path: "/401" });
    }
  }

  next();
});

export default router

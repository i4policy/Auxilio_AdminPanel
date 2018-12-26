import Vue from 'vue';
import Router from 'vue-router';

import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';
import AuthLayout from '@/components/AuthLayout.vue';
import NotFoundPage from '@/components/404.vue';
import UserList from '@/components/users/UserList.vue';
import UserCreate from '@/components/users/UserCreate.vue';
import UserUpdate from '@/components/users/UserUpdate.vue';
import PostCategoryList from '@/components/post-categories/PostCategoryList.vue';
import PostCategoryCreate from '@/components/post-categories/PostCategoryCreate.vue';
import PostCategoryUpdate from '@/components/post-categories/PostCategoryUpdate.vue';

import AuthService from './services/auth.service';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/app',
      component: AuthLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Dashboard
        },
        {
          path: 'users',
          name: 'user-list',
          component: UserList
        },
        {
          path: 'user-create',
          name: 'user-create',
          component: UserCreate
        },
        {
          path: 'user-update/:id',
          name: 'user-update',
          component: UserUpdate
        },
        {
          path: 'categories',
          name: 'category-list',
          component: PostCategoryList
        },
        {
          path: 'category-create',
          name: 'category-create',
          component: PostCategoryCreate
        },
        {
          path: 'category-update/:id',
          name: 'category-update',
          component: PostCategoryUpdate
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '*',
      name: '404',
      redirect: '/404'
    },
    {
      path: '/404',
      component: NotFoundPage
    }
  ]
});

router.beforeEach((to, from, next) => {
  const authenticated = AuthService.isAuthenticated();
  if (authenticated && to.name === 'login') {
    next({ name: 'home' });
  } else if (!authenticated && to.name === 'login') {
    next();
  } else if (!authenticated) {
    next({ name: 'login' });
  } else {
    next();
  }
});
export default router;

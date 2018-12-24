import Vue from 'vue';
import Router from 'vue-router';
// import Home from './views/Home.vue';
import Dashboard from '@/components/Dashboard.vue';
import Login from '@/components/Login.vue';
import AuthContent from '@/components/AuthContent.vue';
import NotFoundPage from '@/components/404.vue';
import UserList from '@/components/users/UserList.vue';
import UserCreate from '@/components/users/UserCreate.vue';
import UserUpdate from '@/components/users/UserUpdate.vue';

import AgendaList from '@/components/agendas/AgendaList.vue';
import AgendaCreate from '@/components/agendas/AgendaCreate.vue';
import AgendaUpdate from '@/components/agendas/AgendaUpdate.vue';
import AuthService from './services/auth.service';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/app',
      component: AuthContent,
      children: [
        {
          path: '',
          name: 'home',
          component: Dashboard,
        },
        {
          path: 'users',
          name: 'user-list',
          component: UserList,
        },
        {
          path: 'user-create',
          name: 'user-create',
          component: UserCreate,
        },
        {
          path: 'user-update/:id',
          name: 'user-update',
          component: UserUpdate,
        },
        {
          path: 'agendas',
          name: 'agenda-list',
          component: AgendaList,
        },
        {
          path: 'agenda-create',
          name: 'agenda-create',
          component: AgendaCreate,
        },
        {
          path: 'agenda-update/:id',
          name: 'agenda-update',
          component: AgendaUpdate,
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      name: '404',
      redirect: '/404',
    },
    {
      path: '/404',
      component: NotFoundPage,
    },
  ],
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

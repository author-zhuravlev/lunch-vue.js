import Vue from 'vue';
import VueRouter from 'vue-router';
import store from './store';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'auth',
      component: () => import('@/views/Auth')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/Home'),
      meta: {
        auth: true
      }
    },
    {
      path: '*',
      redirect: '/home'
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requireAuth = to.matched.some(record => record.meta.auth);
  const isAuth = store.getters.isLoggedIn;

  if (requireAuth && !isAuth) {
    next('/');
  } else {
    next();
  }
});

export default router;

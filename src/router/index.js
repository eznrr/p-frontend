import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import RegisterView from '../views/RegisterView.vue';
import LoginView from '../views/LoginView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView,
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginView,
    },
    {
      path: '/recipes/:id',
      name: 'Recipe',
      component: () => import('../views/RecipeView.vue'),
    },
    {
      path: '/recipes/search/:title',
      name: 'SearchResultsView',
      component: () => import('../views/SearchResultsView.vue'),
    },
    {
      path: '/:username',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
    },
    {
      path: '/auth/profile',
      name: 'MyProfile',
      component: () => import('../views/MyProfileView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth/create',
      name: 'Create',
      component: () => import('../views/CreateRecipeView.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/auth/edit/:id',
      name: 'Edit',
      component: () => import('../views/EditRecipeView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const token = !!localStorage.getItem('token');

  if (requiresAuth && !token) {
    next('/login');
  } else {
    next();
  }
});

export default router

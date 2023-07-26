import { createRouter, createWebHistory } from 'vue-router';
import TaskListView from '../views/TaskLiskView.vue';
import TaskCreateView from '../views/TaskCreateView.vue';
import TaskEditView from '../views/TaskEditView.vue';
import LoginView from '../views/LoginView.vue';
import LogoutView from "../views/LogoutView.vue";
import { requireAuth } from './middleware';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login-page',
      component: LoginView
    },
    {
      path: '/logout',
      name: 'logout-page',
      component: LogoutView
    },
    {
      path: '/',
      name: 'task-list',
      component: TaskListView,
      meta: {
        middleware: [requireAuth], // add middleware as "meta"
      },
    },
    {
      path: '/task/create',
      name: 'task-create',
      component: TaskCreateView
    },
    {
      path: '/task/:id',
      name: 'task-edit',
      component: TaskEditView
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/calendar',
      name: 'calendar',
      component: () => import('../views/CalendarView.vue')
    }
  ],
  //base: 'http://localhost:8001'
  base: 'https://app-462glznbea-ew.a.run.app'
})

router.beforeEach((to, from, next) => {
  if(to.meta.middleware) {
    const middleware = to.meta.middleware;
    middleware.forEach((mw) => {
      mw(to, from, next);
    });
  }
  next();
});

export default router

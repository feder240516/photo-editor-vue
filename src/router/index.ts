import { createRouter, createWebHistory } from 'vue-router';
import CanvasView from '../views/CanvasView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: CanvasView,
    },
  ],
});

export default router;

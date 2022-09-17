import { createRouter, createWebHistory } from "vue-router";
import main from "../views/main.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: main,
    },
    {
      path: "/about",
      name: "about",
      component: main,
    },
    {
      path: "/test",
      name: "test",
      component: main,
    },
  ],
});

export default router;

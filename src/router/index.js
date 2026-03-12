import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import JourneyPage from "../pages/JourneyPage.vue";

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: "/", component: HomePage },
    { path: "/journey", component: JourneyPage }
  ],
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) return { el: to.hash, behavior: "smooth" };
    return { top: 0, behavior: "smooth" };
  }
});

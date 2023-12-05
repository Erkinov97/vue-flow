import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/HomeView.vue";
import NotFound from "@/views/NotFound.vue";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});

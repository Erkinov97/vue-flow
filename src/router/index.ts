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
    path: "/view/:id",
    name: "view",
    component: () => import("@/views/FlowView.vue"),
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

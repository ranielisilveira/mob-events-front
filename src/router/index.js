import Vue from "vue";
import VueRouter from "vue-router";
import EventsView from "../views/EventsView.vue";
import RegisterView from "../views/RegisterView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "events",
    component: EventsView,
  },
  {
    path: "/create",
    name: "registers",
    component: RegisterView,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

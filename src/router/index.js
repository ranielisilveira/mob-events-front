import Vue from 'vue'
import VueRouter from 'vue-router'
import EventsView from "../views/EventsView.vue";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'events',
    component: EventsView
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

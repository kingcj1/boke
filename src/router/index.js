import Vue from "vue";
import VueRouter from "vue-router";
import Main from "../components/main/main";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect:'home',
    component: Main,
    children:[
      {
        path:'/home',
        name:'home_index',
        component: () =>import("../views/Home.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    component: () =>import("../views/About.vue")
  },
];

const router = new VueRouter({
  routes
});

export default router;

import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/meetings",
      name: "meetings",
      component: () =>
        import(/* webpackChunkName: "meetings" */ "./views/Meetings.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "meetings" */ "./views/Register.vue")
    },
    {
      path: "/checkin/:userID/:meetingID",
      name: "checkin",
      component: () =>
        import(/* webpackChunkName: "checkin" */ "./views/CheckIn.vue")
    },
    {
      path: "/attendees/:userID/:meetingID",
      name: "checkin",
      component: () =>
        import(/* webpackChunkName: "attendees" */ "./views/Attendees.vue")
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

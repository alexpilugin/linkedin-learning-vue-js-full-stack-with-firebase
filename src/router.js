import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Firebase from "firebase";

Vue.use(Router);

//eslint-disable-next-line 
let router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      meta: { requiresGuest: true } //accessible for any Guests
    },
    {
      path: "/login",
      name: "login",
      component: () => import(/* webpackChunkName: "about" */ "./views/Login.vue"),
      meta: { requiresGuest: true } //accessible for any Guests
    },
    {
      path: "/register",
      name: "register",
      component: () => import(/* webpackChunkName: "meetings" */ "./views/Register.vue"),
      meta: { requiresGuest: true } //accessible for any Guests
    },
    {
      path: "/meetings",
      name: "meetings",
      component: () => import(/* webpackChunkName: "meetings" */ "./views/Meetings.vue"),
      meta: { requiresAuth: true }, //accessible only for logged-in users
    },
    {
      path: "/checkin/:userID/:meetingID",
      name: "checkin",
      component: () => import(/* webpackChunkName: "checkin" */ "./views/CheckIn.vue"),
      meta: { requiresAuth: true }, //accessible only for logged-in users
    },
    {
      path: "/attendees/:userID/:meetingID",
      name: "checkin",
      component: () => import(/* webpackChunkName: "attendees" */ "./views/Attendees.vue"),
      meta: { requiresAuth: true }, //accessible only for logged-in users
    },
    {
      path: "*",
      redirect: "/"
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  const user = Firebase.auth().currentUser;
  console.log("router.beforeEach: user: " + user);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!user) {
      // Go to home
      next({
        path: '/',
        /* query: { redirect: to.fullPath } */
      });
    } else {
      // Proceed to route
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    // Proceed to route (accessable for Guests)
    next();
  } else {
    // Proceed to route (without any meta data)
    next();
  }
});


export default router;
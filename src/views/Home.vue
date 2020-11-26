<template>
  <div class="mt-3">
    <div v-if="!!user" class="text-secondary text-center">
      Welcome back <span class="font-weight-bold text-info">{{ user.displayName }}</span>,
      <a 
        href="#" 
        class="text-prmary" 
        role="button" 
        @click="$emit('logoutRequest')"
      >logout</a>
    </div>
    <div class="container text-center">
      <div class="row justify-content-center">
        <div class="col-10 col-md-10 col-lg-8 col-xl-7">
          <h4 class="display-4 text-primary mb-2">Meeting Log</h4>
          <p class="lead">
            This simple app creates meetings, allows people to check in, and
            picks random users to award giveaways. It's a good example of a
            Single Page Application which includes connection to a database and
            routing. It's a practical way to learn
            <a href="https://vuejs.org/">Vue.js</a>
            with
            <a href="https://firebase.google.com">Firebase</a>.
            <font-awesome-icon icon="star" class="text-danger" />
          </p>

          <router-link v-if="!user" class="special btn btn-outline-primary mr-2" to="/register">Register</router-link>
          <router-link v-if="!user" class="btn btn-outline-primary mr-2" to="/login">Log In</router-link>
          <router-link v-if="!!user" class="btn btn-primary" to="/meetings">Meetings</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from "@/components/HelloWorld.vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
//import db from "../db.js";

export default {
  name: "home",
  props: ["user"], // from VueRouter props
  components: {
    FontAwesomeIcon
  }
  /*
  data() {
    return {
      user: null
    };
  },
  mounted() {
    db.collection("users")
      .doc("PtzLJve1dG8LASFHxWxH")
      .get()
      .then(snapshot => {
        this.user = snapshot.data().name;
      });
  }
  */
};
</script>

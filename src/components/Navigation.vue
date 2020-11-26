<template>
  <div>
    <nav class="site-nav navbar navbar-expand bg-primary navbar-dark">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Meeting Log</router-link>
        <div class="navbar-nav ml-auto">
          <router-link v-if="!!user" class="navbar-item nav-link" to="/meetings">meetings</router-link>
          <button v-if="!!user" class="btn btn-link nav-item nav-link" @click="$emit('logoutRequest')">logout</button>
          <router-link v-if="!user" class="navbar-item nav-link" to="/login">login</router-link>
          <router-link v-if="!user" class="navbar-item nav-link" to="/register">register</router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "navigation",
  props: ["user"]
};
</script>

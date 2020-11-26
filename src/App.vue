<template>
  <div id="app">
    <Navigation :user="user" @logoutRequest="logout" />
    <router-view 
      class="container" 
      :user="user"
      :meetings="meetings" 
      :error="error"
      @logoutRequest="logout" 
      @addMeeting="addMeeting"
      @deleteMeeting="deleteMeeting"
      @checkIn="checkIn"
    />
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */

// @ is an alias to /src
import Navigation from "@/components/Navigation.vue";
import Firebase from "firebase";
import db from "./db.js"; //Error if to remove it

export default {
  name: "app",
  components: {
    Navigation
  },
  data() {
    return {
      error: null,
      user: null,
      meetings: []
    }
  },
  mounted() {
    /*
    db.collection("users")
      .doc("PtzLJve1dG8LASFHxWxH")
      .get()
      .then(snapshot => {
        this.user = snapshot.data().name;
      });
    */
    Firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user =  user; // user.displayName || "User";
        this.meetings = [];
        db.collection("users")
          .doc(this.user.uid)
            .collection("meetings")
              .onSnapshot(snapshot => {
                const snapData = [];
                snapshot.forEach( doc => {
                  snapData.push({
                    id: doc.id,
                    name: doc.data().name
                  })
                }) 
                this.meetings = snapData.sort((a,b) => {
                  if(a.name.toLowerCase() < b.name.toLowerCase()) return -1;
                  if(b.name.toLowerCase() < a.name.toLowerCase()) return 1;
                  if(b.name.toLowerCase() == a.name.toLowerCase()) return 0;
                })
              }, function (error) {
                console.log("App.mounted() onAuthStateChanged() error: " + error.message);
                throw error // THIS ALWAYS GETS HIT
              });
      }
    });
  },
  methods: {
    logout(){
      Firebase.auth()
        .signOut()
        .then( () => {
          this.user = null;
          //this.$router.push("login"); ---> /attendees/<userId>/login
          this.$router.push({ path: "/login"});
        })
    },
    addMeeting(payload) {
      //console.log(payload);
      db.collection("users")
        .doc(this.user.uid)
          .collection("meetings")
            .add({
              name: payload,
              createdAt: Firebase.firestore.FieldValue.serverTimestamp()
            })
    },
    deleteMeeting(payload) {
      db.collection("users")
        .doc(this.user.uid)
          .collection("meetings")
            .doc(payload)
              .delete();
    },
    checkIn(payload) {
      db.collection("users")
        .doc(payload.userId)
          .collection("meetings")
            .doc(payload.meetingID)
              .get() //check if exists
                .then( doc => {
                  if(doc.exists) {
                    db.collection("users")
                      .doc(payload.userId)
                        .collection("meetings")
                          .doc(payload.meetingID) 
                            .collection("attendees")
                              .add({
                                createdAt: Firebase.firestore.FieldValue.serverTimestamp(),
                                displayName: payload.displayName,
                                email: payload.email
                              })
                              .then(() => this.$router.push(`/attendees/${payload.userId}/${payload.meetingID}`))
                  } else {
                    //the meeting doesn't exist
                    this.error = "Sorry, no such a meeting found"
                  }
                }, function (error) {
                  throw error // THIS ALWAYS GETS HIT
                });
    }
  }
};
</script>

<style lang="scss">
$primary: #05b2dd;
$warning: orangered;
@import "node_modules/bootstrap/scss/bootstrap";
textarea, select, input, button { outline: none !important; }
:focus {
  outline-color: transparent;
  outline-style: none;
}
</style>

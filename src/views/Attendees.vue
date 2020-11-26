<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h1 class="font-weight-light text-center text-primary">
          {{ meetingName }}
        </h1>
        <h2 class="font-weight-light text-center">Attendees</h2>

        <div class="card bg-light mb-4" v-if="!!user && user.uid == userId">
          <div class="card-body text-center">
            <div class="input-group input-group-lg">
              <input
                type="text"
                placeholder="Search Attendees"
                class="form-control"
                v-model="searchQuery"
                ref="searchQuery"
              />
              <div class="input-group-append">
                <button
                  class="btn btn-sm btn-outline-info"
                  title="Pick a random attendee"
                  @click="chooseRandom()"
                >
                  <font-awesome-icon icon="random"></font-awesome-icon>
                </button>
                <button
                  class="btn btn-sm btn-outline-info"
                  title="Reset Search"
                  @click="resetQuery"
                >
                  <font-awesome-icon icon="undo"></font-awesome-icon>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div
        v-for="person in filteredAttendees"
        :key="person.id"
        class="col-8 col-sm-6 col-md-4 col-lg-3 mb-2 p-0 px-1"
      >
        <div class="card">
          <div
            class="card-body px-3 py-2 d-flex align-items-center justify-content-between"
          >
            <div>
              <font-awesome-icon icon="user" class="text-primary mr-2" />
              {{ person.displayName }}
            </div>
            <div v-if="!!user && user.uid == userId" class="btn-group pr-2">
              <button
                class="btn btn-sm btn-outline-secondary"
                title="Give user a Star"
                @click="toggleStar(person.id)"
              >
                <font-awesome-icon
                  icon="star"
                  :class="person.star ? 'text-warning' : ''"
                />
              </button>
              <a
                class="btn btn-sm btn-outline-secondary"
                title="Send user an email"
                :href="`mailto:${person.email}`"
              >
                <font-awesome-icon icon="envelope" />
              </a>
              <button
                class="btn btn-sm btn-outline-secondary"
                title="Delete Attendee"
                @click="deleteAttendee(person.id)"
              >
                <font-awesome-icon icon="trash" class="text-danger" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from "../db.js";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "attendees",
  props: ["user"],
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      attendees: [],
      displayAttendees: [],
      searchQuery: "",
      userId: this.$route.params.userID,
      meetingID: this.$route.params.meetingID,
      meetingName: null
    };
  },
  mounted() {
    const meetingRef = db
      .collection("users")
      .doc(this.userId)
      .collection("meetings")
      .doc(this.meetingID);

    meetingRef.get().then(doc => {
      this.meetingName = doc.data().name;
    });

    meetingRef.collection("attendees").onSnapshot(snapshot => {
      const snapData = [];
      snapshot.forEach(doc => {
        snapData.push({
          id: doc.id,
          email: doc.data().email,
          displayName: doc.data().displayName,
          star: doc.data().star
        });
      });
      this.attendees = snapData;
      this.displayAttendees = snapData;
    }, function (error) {
        console.log("Attendees.mounted() .onSnapshot() error" + error.message);
        throw error // THIS ALWAYS GETS HIT
    });
  },
  computed: {
    filteredAttendees() {
      const dataFilter = item => item.displayName.toLowerCase().match(this.searchQuery.toLowerCase()) && true;
      return this.displayAttendees.filter(dataFilter);
    }
  },
  methods: {
    deleteAttendee(attendeeID) {
      if (this.user && this.user.uid == this.userId) {
        db.collection("users")
          .doc(this.userId)
          .collection("meetings")
          .doc(this.meetingID)
          .collection("attendees")
          .doc(attendeeID)
          .delete();
      }
    },
    toggleStar(attendeeID) {
      if (this.user && this.user.uid == this.userId) {
        const ref = db
          .collection("users")
          .doc(this.userId)
          .collection("meetings")
          .doc(this.meetingID)
          .collection("attendees")
          .doc(attendeeID);

        ref.get().then(doc => {
          const star = doc.data().star;
          if (star) {
            ref.update({
              star: !star
            });
          } else {
            //if doesn't exist
            ref.update({
              star: true
            });
          }
        }, function (error) {
          throw error // THIS ALWAYS GETS HIT
        });
      }
    },
    chooseRandom() {
      const randomAttendee = Math.floor(Math.random() * this.attendees.length);
      this.displayAttendees = [this.attendees[randomAttendee]];
    },
    resetQuery() {
      this.displayAttendees = this.attendees;
      this.searchQuery = "";
      this.$refs.searchQuery.focus();
    }
  }
};
</script>

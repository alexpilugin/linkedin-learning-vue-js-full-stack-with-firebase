<template>
  <div class="container mt-4">
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <h1 class="font-weight-light text-center">Add a Meeting</h1>

        <div class="card bg-light">
          <div class="card-body text-center">
            <form class="formgroup">
              <div class="input-group input-group-lg">
                <input
                  type="text"
                  class="form-control"
                  name="meetingName"
                  placeholder="Meeting name"
                  aria-describedby="buttonAdd"
                  v-model="meetingName"
                  ref="meetingName"
                />
                <div class="input-group-append">
                  <button
                    type="submit"
                    class="btn btn-sm btn-info"
                    id="buttonAdd"
                    @click.prevent="addMeeting"
                  >
                    +
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-12 col-md-9 col-lg-7">
        <div class="card border-top-0 rounded-0">
          <div class="card-body py-2">
            <h4 class="card-title m-0 text-center">Your Meetings</h4>
          </div>
          <div class="list-group list-group-flush">
            <div
              v-for="item in meetings"
              :key="item.id"
              class="list-group-item d-flex justify-content-between"
            >
              <section class="pl-3 text-left align-self-center float-left">
                <span 
                  class="clickable" 
                  @click="gotoAttendees(user.uid, item.id)"
                >
                  {{ item.name }}
              </span>
              </section>
              <section
                class="btn-group align-self-center float-right"
                role="group"
                aria-label="Meeting Options"
              >
                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Check In"
                  :to="`/checkin/${user.uid}/${item.id}`"
                >
                  <font-awesome-icon icon="user-plus" class="text-success" />
                </router-link>
                <router-link
                  class="btn btn-sm btn-outline-secondary"
                  title="Attendees"
                  :to="`/attendees/${user.uid}/${item.id}`"
                >
                  <font-awesome-icon icon="list-ul" class="text-primary" />
                </router-link>
                <button
                  class="btn btn-sm btn-outline-secondary"
                  title="Delete Meeting"
                  @click="$emit('deleteMeeting', item.id)"
                >
                  <font-awesome-icon icon="trash" class="text-danger" />
                </button>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

export default {
  name: "meetings",
  props: ["user", "meetings"], // from VueRouter props
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      meetingName: null
    };
  },
  methods: {
    addMeeting() {
      this.$emit("addMeeting", this.meetingName);
      this.meetingName = null;
      this.$refs.meetingName.focus();
    },
    gotoAttendees(userId, itemId) {
      this.$router.push({ path: `/attendees/${userId}/${itemId}` });
    }
  }
};
</script>

<style lang="scss">
@import "node_modules/bootstrap/scss/bootstrap";
.clickable {
  cursor: pointer;
}
.clickable:hover {
  color: $primary;
}
</style>

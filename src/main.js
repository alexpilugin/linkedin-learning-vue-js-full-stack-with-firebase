import Vue from "vue";
import App from "./App.vue";
import router from "./router";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  //fa-trash, fa-link, fa-list-ul,... camelCase for JS:
  faTrash,
  faLink,
  faListUl,
  faUser,
  faUserPlus,
  faRandom,
  faUndo,
  faStar,
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
library.add(faTrash, faLink, faListUl, faUser, faUserPlus, faRandom, faUndo, faStar, faEnvelope);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

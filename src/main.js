import Vue from "vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/index";
import "./assets/styles/variables.scss";
import "./assets/styles/typography.scss";
import App from "./App.vue";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

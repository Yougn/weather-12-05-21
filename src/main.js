import Vue from "vue";
import App from "./App.vue";
import "./index.css";
import "./registerServiceWorker";
import router from "./router";
import store from "./store/index";
import "./assets/styles/variables.scss";
import "./assets/styles/typography.scss";
import HumidityIcon from "./components/icons/HumidityIcon";
import PressureIcon from "./components/icons/PressureIcon";
import WindIcon from "./components/icons/WindIcon";
import SunriseIcon from "./components/icons/SunriseIcon";
import SunsetIcon from "./components/icons/SunsetIcon";
import DaytimeIcon from "./components/icons/DaytimeIcon";
import SunIcon from "./components/icons/SunIcon";
import MistIcon from "./components/icons/MistIcon";
import SnowIcon from "./components/icons/SnowIcon";
import RainIcon from "./components/icons/RainIcon";
import ScatteredCloudsIcon from "./components/icons/ScatteredCloudsIcon";
import BrokenCloudsIcon from "./components/icons/BrokenCloudsIcon";
import ShowerRainIcon from "./components/icons/ShowerRainIcon";
import ThunderstormIcon from "./components/icons/ThunderstormIcon";
import FewCloudsIcon from "./components/icons/FewCloudsIcon";
import RainNightIcon from "./components/icons/RainNightIcon";
import FewCloudsNightIcon from "./components/icons/FewCloudsNightIcon";
import SmallSunIcon from "./components/icons/SmallSunIcon";
import SmallMoonIcon from "./components/icons/SmallMoonIcon";
import ArrowupIcon from "./components/icons/ArrowupIcon";
import ArrowdownIcon from "./components/icons/ArrowdownIcon";
import PlaceIcon from "./components/icons/PlaceIcon";
import MoonIcon from "./components/icons/MoonIcon";

Vue.component("HumidityIcon", HumidityIcon);
Vue.component("PressureIcon", PressureIcon);
Vue.component("WindIcon", WindIcon);
Vue.component("SunriseIcon", SunriseIcon);
Vue.component("SunsetIcon", SunsetIcon);
Vue.component("DaytimeIcon", DaytimeIcon);
Vue.component("SunIcon", SunIcon);
Vue.component("MistIcon", MistIcon);
Vue.component("SnowIcon", SnowIcon);
Vue.component("RainIcon", RainIcon);
Vue.component("ScatteredCloudsIcon", ScatteredCloudsIcon);
Vue.component("BrokenCloudsIcon", BrokenCloudsIcon);
Vue.component("ShowerRainIcon", ShowerRainIcon);
Vue.component("ThunderstormIcon", ThunderstormIcon);
Vue.component("FewCloudsIcon", FewCloudsIcon);
Vue.component("RainNightIcon", RainNightIcon);
Vue.component("FewCloudsNightIcon", FewCloudsNightIcon);
Vue.component("SmallSunIcon", SmallSunIcon);
Vue.component("SmallMoonIcon", SmallMoonIcon);
Vue.component("ArrowupIcon", ArrowupIcon);
Vue.component("ArrowdownIcon", ArrowdownIcon);
Vue.component("PlaceIcon", PlaceIcon);
Vue.component("MoonIcon", MoonIcon);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

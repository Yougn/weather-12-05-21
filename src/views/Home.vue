<template>
  <div class="home" v-if="weather">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="weather.sunset" />
  </div>
  <div v-else-if="loading">
    <Loader />
  </div>
  <div v-else>EMPTY</div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import Loader from "@/components/Loader";

export default {
  name: "Home",
  components: {
    HelloWorld,
    Loader,
  },
  data() {
    return {
      weather: null,
      loading: false,
    };
  },
  mounted() {
    this.getWeather();
  },
  computed: {},
  methods: {
    getWeather() {
      // this.loading = true;
      // get the weather from open weather map API
      // this.weather = data from API
      // this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  background: antiquewhite;
}
</style>

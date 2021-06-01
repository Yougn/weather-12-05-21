<template>
  <div class="weather-place">
    <p class="weather-place__date">
      {{ date }}
    </p>
    <p class="weather-place__city">
      {{ weather.city_name }}, Russia
      <span class="pt-1 pl-3"><PlaceIcon /></span>
    </p>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { mapState } from "vuex";
export default {
  name: "WeatherPlace",
  data() {
    return {
      date: "",
    };
  },
  computed: {
    ...mapState(["weather"]),
  },
  mounted() {
    setInterval(this.getNow, 100);
  },
  methods: {
    getNow: function () {
      this.date = DateTime.now().toFormat("cccc, dd LLL yyyy hh:mma");
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-place {
  @apply flex justify-between;

  &__date {
    @apply m-0 px-5 py-4 text-grey;
    max-width: 180px;
    font-size: 14px;
    line-height: 17px;
  }

  &__city {
    @apply flex m-0 mb-4 py-4 pr-5 pl-6 text-center text-secondary-color;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    background: rgba(13, 159, 234, 0.08);
    border-radius: 0 0 0 25px;
  }
}
</style>

<template>
  <div class="flex justify-between weather-place">
    <p class="m-0 px-5 py-4 text-grey weather-place__date">
      {{ date }}
    </p>
    <p
      class="
        flex
        m-0
        mb-4
        py-4
        pr-5
        pl-6
        text-center text-blue
        weather-place__city
      "
    >
      {{ weather.city_name }}, Russia
      <span class="pl-3"><PlaceIcon /></span>
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
      const dateTime = DateTime.now().toFormat("ccc, dd LLL yyyy hh:mma");
      this.date = dateTime;
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-place {
  &__date {
    max-width: 180px;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 1px;
  }

  &__city {
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    background: rgba(13, 159, 234, 0.08);
    border-radius: 0 0 0 25px;
  }
}
</style>

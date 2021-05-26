<template>
  <div class="weather-place">
    <p class="weather-place__date">{{ formattedDate() }}</p>
    <p class="weather-place__city">
      {{ weather.city_name }}, Russia
      <span class="weather-place__icon"><PlaceIcon /></span>
    </p>
  </div>
</template>

<script>
import { DateTime } from "luxon";
import { mapState } from "vuex";
export default {
  name: "WeatherPlace",
  computed: {
    ...mapState(["weather"]),
  },
  methods: {
    formattedDate() {
      return DateTime.now().toFormat("ccc, dd LLL yyyy hh:mma");
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-place {
  display: flex;
  justify-content: space-between;

  &__date {
    margin: 0;
    max-width: 180px;
    padding: 16px 20px;
    font-size: 14px;
    line-height: 17px;
    letter-spacing: 0.5px;
    color: var(--color-grey);
  }

  &__city {
    margin: 0 0 16px;
    padding: 14px 20px 15px 27px;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    text-align: center;
    color: var(--color-blue);
    background: rgba(13, 159, 234, 0.08);
    border-radius: 0 0 0 25px;
  }

  &__icon {
    padding-left: 12px;
  }
}
</style>

<template>
  <div class="weather-now">
    <p class="weather-now__state">
      <component
        :is="formatIcon(weather.data[0].weather.icon)"
        class="w-10 h-10"
      />
      <span>
        {{ weather.data[0].weather.description }}
      </span>
    </p>
    <h2 class="m-0 relative weather-now__temperature">
      {{ formattedTemp(weather.data[0].temp) }}
    </h2>
    <p class="weather-peaks">
      <span class="pb-3 weather-peaks__item weather-peaks__item_up">
        {{ formattedTemp(weather.data[0].max_temp) }} °C
      </span>
      <span class="weather-peaks__item weather-peaks__item_down">
        {{ formattedTemp(weather.data[0].min_temp) }} °C
      </span>
    </p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getFormattedIcon } from "../utils/weatherIcon";
export default {
  name: "WeatherNow",
  computed: {
    ...mapState(["weather"]),
  },
  methods: {
    formattedTemp(temp) {
      return Math.round(temp);
    },
    formatIcon(code) {
      return getFormattedIcon(code);
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-now {
  @apply flex justify-between items-center m-0 px-10 pt-1 pb-4;

  &__state {
    @apply flex flex-col items-center m-0 text-center;
    max-width: 60px;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.05em;
  }

  &__temperature {
    &::after {
      @apply absolute;
      content: "°";
      top: 10px;
      right: -6px;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: var(--dark-grey-color);
    }

    &::before {
      @apply absolute;
      content: "C";
      top: 10px;
      right: -20px;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: var(--dark-grey-color);
    }
  }

  .weather-peaks {
    @apply flex flex-col items-center relative m-0 pr-3.5 pl-2.5;

    &__item {
      @apply relative;
      font-weight: 300;
      font-size: 16px;
      line-height: 19px;
      color: var(--dark-grey-color);

      &_up::after {
        @apply absolute w-2.5 h-2.5 bg-no-repeat bg-center;
        content: "";
        top: 4px;
        right: -10px;
        background-image: url("../assets/arrow.svg");
        transform: matrix(1, 0, 0, -1, 0, 0);
      }

      &_down::after {
        @apply absolute w-2.5 h-2.5 bg-no-repeat bg-center;
        content: "";
        top: 8px;
        right: -10px;
        background-image: url("../assets/arrow.svg");
      }
    }
  }
}
</style>

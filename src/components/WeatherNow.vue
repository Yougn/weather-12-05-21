<template>
  <div
    class="flex justify-between items-center m-0 px-10 pt-1 pb-4 weather-now"
  >
    <p class="flex flex-col items-center m-0 text-center weather-now__state">
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
    <p
      class="
        flex flex-col
        items-center
        relative
        m-0
        pr-3.5
        pl-2.5
        weather-peaks
      "
    >
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
  &__state {
    max-width: 60px;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.05em;
  }

  &__temperature {
    &::after {
      position: absolute;
      content: "°";
      top: 10px;
      right: -4px;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: var(--color-dark-grey);
    }

    &::before {
      position: absolute;
      content: "C";
      top: 10px;
      right: -18px;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: var(--color-dark-grey);
    }
  }

  .weather-peaks {
    &__item {
      position: relative;
      font-weight: 300;
      font-size: 16px;
      line-height: 19px;
      color: var(--color-dark-grey);

      &_up::after {
        position: absolute;
        content: "";
        top: 4px;
        right: -10px;
        width: 10px;
        height: 10px;
        background-image: url("../assets/arrow.svg");
        transform: matrix(1, 0, 0, -1, 0, 0);
        background-repeat: no-repeat;
        background-position: center;
      }

      &_down::after {
        position: absolute;
        content: "";
        top: 8px;
        right: -10px;
        width: 10px;
        height: 10px;
        background-image: url("../assets/arrow.svg");
        background-repeat: no-repeat;
        background-position: center;
      }
    }
  }
}
</style>

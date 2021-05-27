<template>
  <div class="weather-now">
    <p class="weather-now__state">
      <component
        :is="formatIcon(weather.data[0].weather.icon)"
        class="weather-now__icon"
      />
      <span>
        {{ weather.data[0].weather.description }}
      </span>
    </p>
    <h2 class="weather-now__temperature">
      {{ formattedTemp(weather.data[0].temp) }}
    </h2>
    <p class="weather-peaks">
      <span class="weather-peaks__item weather-peaks__item_up">
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 4px 42px 18px;

  &__state {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0;
    max-width: 60px;
    text-align: center;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.05em;
  }

  &__icon {
    width: 40px;
    height: 40px;
  }

  &__temperature {
    position: relative;
    margin: 0;

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
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    margin: 0;
    padding: 0 10px 0;

    &__item {
      position: relative;
      font-weight: 300;
      font-size: 16px;
      line-height: 19px;
      color: var(--color-dark-grey);

      &_up {
        padding: 0 0 12px;
      }

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

<template>
  <div class="weather-now">
    <p class="weather-now__state">
      <span>
        {{ description }}
      </span>
      <component :is="isDay ? `SunIcon` : `MoonIcon`" />
    </p>
    <h2 class="weather-now__temperature">{{ formattedTemp }}</h2>
    <p class="weather-peaks">
      <span class="weather-peaks__item weather-peaks__item_top">
        {{ maxTemp }} °C
      </span>
      <span class="weather-peaks__item weather-peaks__item_down">
        {{ minTemp }} °C
      </span>
    </p>
  </div>
</template>

<script>
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
export default {
  name: "WeatherNow",
  components: {
    SunIcon,
    MoonIcon,
  },
  // TODO ES: remove unnecessary props in favour of store
  props: {
    description: { type: String, required: true },
    temp: { type: Number, required: true },
    maxTemp: { type: Number, required: true },
    minTemp: { type: Number, required: true },
    isDay: { type: Boolean, required: true },
  },
  computed: {
    formattedTemp() {
      return Math.round(this.temp);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.css";
.weather-now {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0;
  padding: 10px 48px 20px;

  &__state {
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    margin: 0;
    padding-bottom: 5px;
    max-width: 60px;
    font-size: 18px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.05em;
  }

  &__temperature {
    position: relative;
    margin: 0;

    &::after {
      position: absolute;
      content: "°";
      top: 10px;
      left: 57px;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: var(--color-dark-grey);
    }

    &::before {
      position: absolute;
      content: "C";
      top: 10px;
      left: 65px;
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
    padding: 0 5px 0;

    &__item {
      position: relative;
      padding-bottom: 10px;
      font-weight: 300;
      font-size: 16px;
      line-height: 19px;
      color: var(--color-dark-grey);

      &_top::after {
        position: absolute;
        content: "";
        top: 3px;
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

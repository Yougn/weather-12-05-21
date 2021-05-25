<template>
  <div class="weather-now">
    <p class="weather-now__state">
      <span>
        {{ weather.data[0].weather.description }}
      </span>
      <component
        :is="
          isDay
            ? formatIconDay(weather.data[0].weather.code)
            : formatIconNight(weather.data[0].weather.code)
        "
        class="weather-now__icon"
      />
    </p>
    <h2 class="weather-now__temperature">{{ formattedTemp }}</h2>
    <p class="weather-peaks">
      <span class="weather-peaks__item weather-peaks__item_up">
        {{ weather.data[0].max_temp }} °C
      </span>
      <span class="weather-peaks__item weather-peaks__item_down">
        {{ weather.data[0].min_temp }} °C
      </span>
    </p>
  </div>
</template>

<script>
import SunIcon from "./icons/SunIcon";
import MoonIcon from "./icons/MoonIcon";
import RainIcon from "./icons/RainIcon";
import SmallSunIcon from "./icons/SmallSunIcon";
import MistIcon from "./icons/MistIcon";
import SnowIcon from "./icons/SnowIcon";
import ScatteredCloudsIcon from "./icons/ScatteredCloudsIcon";
import BrokenCloudsIcon from "./icons/BrokenCloudsIcon";
import ShowerRainIcon from "./icons/ShowerRainIcon";
import ThunderstormIcon from "./icons/ThunderstormIcon";
import FewCloudsIcon from "./icons/FewCloudsIcon";
import RainNightIcon from "./icons/RainNightIcon";
import FewCloudsNightIcon from "./icons/FewCloudsNightIcon";
import SmallMoonIcon from "./icons/SmallMoonIcon";
import { mapState } from "vuex";
export default {
  name: "WeatherNow",
  components: {
    SunIcon,
    MoonIcon,
    RainIcon,
    SmallSunIcon,
    MistIcon,
    SnowIcon,
    ScatteredCloudsIcon,
    BrokenCloudsIcon,
    ShowerRainIcon,
    ThunderstormIcon,
    FewCloudsIcon,
    RainNightIcon,
    FewCloudsNightIcon,
    SmallMoonIcon,
  },
  props: {
    isDay: { type: Boolean, required: true },
    formatIconDay: { type: Function, required: true },
    formatIconNight: { type: Function, required: true },
  },
  computed: {
    ...mapState(["weather"]),
    formattedTemp() {
      return Math.round(this.weather.data[0].temp);
    },
  },
};
</script>

<style lang="scss" scoped>
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

      &_up::after {
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

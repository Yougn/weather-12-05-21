<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <img class="weather-bg" :src="getDayOrNightImgPath" alt="Street" />
    <p v-if="error" class="weather-error">{{ error.message }}</p>
    <div v-else-if="weather" class="weather">
      <WeatherPlace />
      <WeatherNow
        :isDay="getCurrentPeriod"
        :formatIconDay="formatIconDay"
        :formatIconNight="formatIconNight"
      />
      <ul class="weather-info">
        <WeatherInfoItem :info="formattedWeather.humidity" subtitle="Humidity">
          <HumidityIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedWeather.pressure" subtitle="Pressure">
          <PressureIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedWeather.wind" subtitle="Wind">
          <WindIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedWeather.sunrise" subtitle="Sunrise">
          <SunriseIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedWeather.sunset" subtitle="Sunset">
          <SunsetIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedDaytime" subtitle="Daytime">
          <DaytimeIcon />
        </WeatherInfoItem>
      </ul>
      <ul class="weather-week">
        <li
          class="weather-week__item"
          v-for="(d, index) in weather.data"
          v-bind:key="index"
        >
          <span class="weather-week__icon weather-week__icon_state">
            <component :is="getFormattedIcons(d.weather.code)" />
          </span>
          <p class="weather-week__title title">
            {{ formatDate(d.sunrise_ts) }}
          </p>
          <span class="weather-week__container">
            <span class="weather-week__text weather-week__text_left subtitle">
              {{ d.max_temp }}
              <span class="weather-week__icon"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__text weather-week__text_right subtitle">
              {{ d.min_temp }}
              <span class="weather-week__icon"><ArrowdownIcon /></span>
            </span>
          </span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import WeatherPlace from "../components/WeatherPlace";
import WeatherNow from "../components/WeatherNow";
import WeatherInfoItem from "../components/WeatherInfoItem";
import { DateTime } from "luxon";
import { mapActions, mapState } from "vuex";

export default {
  name: "Weather",
  components: {
    Loader,
    WeatherNow,
    WeatherPlace,
    WeatherInfoItem,
  },
  data() {
    return {
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.loadWeather();
  },
  computed: {
    ...mapState(["weather"]),
    formattedWeather() {
      return {
        humidity: `${this.weather.data[0].rh}%`,
        pressure: `${this.weather.data[0].pres.toFixed(1)}mBar`,
        wind: `${this.weather.data[0].wind_spd.toFixed(1)} km/h`,
        sunrise: DateTime.fromSeconds(this.weather.data[0].sunrise_ts).toFormat(
          "h:mm a"
        ),
        sunset: DateTime.fromSeconds(this.weather.data[0].sunset_ts).toFormat(
          "h:mm a"
        ),
      };
    },
    formattedDaytime() {
      const diff = DateTime.fromSeconds(this.weather.data[0].sunset_ts).diff(
        DateTime.fromSeconds(this.weather.data[0].sunrise_ts),
        ["hours", "minutes"]
      );
      return diff.hours + "h " + Math.round(diff.minutes) + "m";
    },
    getCurrentPeriod() {
      const start = DateTime.fromSeconds(
        this.weather.data[0].sunrise_ts
      ).toFormat("HH:mm");
      const finish = DateTime.fromSeconds(
        this.weather.data[0].sunset_ts
      ).toFormat("HH:mm");

      const currentHour = DateTime.now().toFormat("HH:mm");
      return currentHour >= start && currentHour <= finish;
    },
    getDayOrNightImgPath() {
      return this.getCurrentPeriod
        ? require("../assets/day.svg")
        : require("../assets/night.svg");
    },
  },
  methods: {
    ...mapActions(["getWeatherFromApi"]),
    async loadWeather() {
      this.loading = true;
      this.error = null;
      try {
        await this.getWeatherFromApi();
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return DateTime.fromSeconds(date).toFormat("ccc, dd");
    },
    formatIconDay(iconCode) {
      switch (iconCode) {
        case 200:
          return "ThunderstormIcon";
        case 500:
          return "RainIcon";
        case 521:
          return "ShowerRainIcon";
        case 601:
          return "SnowIcon";
        case 700:
          return "MistIcon";
        case 801:
          return "FewCloudsIcon";
        case 802:
          return "ScatteredCloudsIcon";
        case 803:
          return "BrokenCloudsIcon";
        default:
          return "SmallSunIcon";
      }
    },
    formatIconNight(iconCode) {
      switch (iconCode) {
        case 200:
          return "ThunderstormIcon";
        case 500:
          return "RainNightIcon";
        case 521:
          return "ShowerRainIcon";
        case 601:
          return "SnowIcon";
        case 700:
          return "MistIcon";
        case 801:
          return "FewCloudsNightIcon";
        case 802:
          return "ScatteredCloudsIcon";
        case 803:
          return "BrokenCloudsIcon";
        default:
          return "SmallMoonIcon";
      }
    },
    getFormattedIcons(iconCode) {
      return this.getCurrentPeriod
        ? this.formatIconDay(iconCode)
        : this.formatIconNight(iconCode);
    },
  },
};
</script>

<style scoped lang="scss">
.weather-bg {
  width: 100%;
  height: calc(100vh - 510px);
  min-height: 50px;
  object-fit: cover;
  margin-bottom: -26px;
  background-color: var(--bg-img);
}

.weather-error {
  margin: 0;
  padding-top: 100px;
  font-size: 18px;
  text-align: center;
}

.weather {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background-color: var(--color-white);
  box-shadow: 0px -16px 40px rgba(0, 0, 0, 0.2);
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  z-index: 2;

  .weather-info {
    margin: 0;
    padding: 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .weather-week {
    margin: 0;
    padding: 12px 20px 35px;
    list-style: none;
    display: inline-flex;
    overflow: auto;

    &__item {
      position: relative;
      max-width: 95px;
      padding: 14px 22px 10px;
      margin-right: 20px;
      text-align: center;
      background-color: var(--color-white);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border-radius: 16px;

      &:last-child {
        padding: 14px 26px 10px;
      }

      &:last-child::before {
        position: absolute;
        content: "";
        right: -20px;
        bottom: 0;
        width: 20px;
        height: 1px;
        background-repeat: no-repeat;
        background-position: center;
      }
    }

    &__title {
      margin: 0;
      text-align: center;
    }

    &__container {
      display: flex;
      justify-content: space-between;
      padding: 5px 0;
      position: relative;
    }

    &__text {
      display: flex;
      align-items: center;
      color: var(--color-grey);

      &_left {
        padding-right: 10px;
      }
    }

    &__icon {
      &_state {
        padding: 0 0 10px;
      }
      padding-left: 2px;
    }
  }
}
</style>

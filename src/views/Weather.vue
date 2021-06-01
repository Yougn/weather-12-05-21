<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else>
    <p v-if="error" class="m-0 pt-60 text-xl text-center">
      {{ error.message }}
    </p>
    <div v-else-if="weather">
      <img
        class="weather-bg bg-secondary-color"
        :src="getDayOrNightImgPath"
        alt="Street"
      />
      <div class="weather bg-primary-color">
        <WeatherPlace />
        <WeatherNow />
        <ul class="weather-info">
          <WeatherInfoItem
            :info="formattedWeather.humidity"
            subtitle="Humidity"
          >
            <HumidityIcon />
          </WeatherInfoItem>
          <WeatherInfoItem
            :info="formattedWeather.pressure"
            subtitle="Pressure"
          >
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
            <span class="block pb-3">
              <component :is="formatIcon(d.weather.icon)" />
            </span>
            <p class="m-0 pb-1 text-center title">
              {{ formatDate(d.sunrise_ts) }}
            </p>
            <span class="flex justify-between relative pb-2">
              <span class="pr-2.5 weather-week__text subtitle">
                {{ d.max_temp }}
                <span class="pl-0.5"><ArrowupIcon /></span>
              </span>
              <span class="weather-week__text subtitle">
                {{ d.min_temp }}
                <span class="pl-0.5"><ArrowdownIcon /></span>
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Loader from "../components/Loader";
import WeatherPlace from "../components/WeatherPlace";
import WeatherNow from "../components/WeatherNow";
import WeatherInfoItem from "../components/WeatherInfoItem";
import { DateTime } from "luxon";
import { getFormattedIcon } from "../utils/weatherIcon";
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
        sunrise: DateTime.fromSeconds(this.weather.data[0].sunrise_ts)
          .setZone("Europe/Moscow")
          .toFormat("h:mm a"),
        sunset: DateTime.fromSeconds(this.weather.data[0].sunset_ts)
          .setZone("Europe/Moscow")
          .toFormat("h:mm a"),
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
    formatIcon(code) {
      return getFormattedIcon(code);
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-bg {
  @apply w-full object-cover -mb-6;
  height: calc(100vh - 510px);
  min-height: 50px;
}

.weather {
  @apply flex flex-col relative w-full rounded-t-3xl overflow-hidden shadow-sm z-10;

  .weather-info {
    @apply flex flex-wrap justify-between m-0;
    padding: 16px 6px 8px;
  }

  .weather-week {
    @apply inline-flex m-0 list-none overflow-auto pt-3 px-5 pb-12;

    &__item {
      @apply flex flex-col items-center mr-5  relative px-5 pt-4 pb-2 bg-primary-color shadow-md;
      min-width: 95px;
      border-radius: 16px;

      &:last-child::before {
        @apply absolute bottom-0 bg-no-repeat bg-center w-5 h-0.5;
        content: "";
        right: -20px;
      }
    }

    &__text {
      @apply flex items-center text-grey;
    }
  }
}
</style>

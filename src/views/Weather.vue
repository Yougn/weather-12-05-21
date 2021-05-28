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
        class="w-full object-cover -mb-6 bg-bgImg weather-bg"
        :src="getDayOrNightImgPath"
        alt="Street"
      />
      <div
        class="
          flex flex-col
          relative
          w-full
          bg-bgWhite
          rounded-t-3xl
          overflow-hidden
          weather
        "
      >
        <WeatherPlace />
        <WeatherNow />
        <ul
          class="flex flex-wrap justify-between m-0 pt-5 px-4 pb-1 weather-info"
        >
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
        <ul
          class="
            inline-flex
            m-0
            list-none
            overflow-auto
            pt-3
            px-5
            pb-12
            weather-week
          "
        >
          <li
            class="mr-5 weather-week__item"
            v-for="(d, index) in weather.data"
            v-bind:key="index"
          >
            <span class="weather-week__icon weather-week__icon_state">
              <component :is="formatIcon(d.weather.icon)" />
            </span>
            <p class="m-0 text-center title">
              {{ formatDate(d.sunrise_ts) }}
            </p>
            <span
              class="flex justify-between relative py-2 weather-week__container"
            >
              <span
                class="
                  flex
                  items-center
                  pr-2.5
                  text-grey
                  weather-week__text weather-week__text_left
                  subtitle
                "
              >
                {{ d.max_temp }}
                <span class="pl-0.5"><ArrowupIcon /></span>
              </span>
              <span
                class="
                  flex
                  items-center
                  text-grey
                  weather-week__text weather-week__text_right
                  subtitle
                "
              >
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

<style scoped lang="scss">
.weather-bg {
  height: calc(100vh - 510px);
  min-height: 50px;
}

.weather {
  box-shadow: 0px -16px 40px rgba(0, 0, 0, 0.2);
  z-index: 2;

  .weather-week {
    &__item {
      width: 95px;
      padding: 16px 22px 8px;
      background-color: var(--color-white);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border-radius: 16px;

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
  }
}
</style>

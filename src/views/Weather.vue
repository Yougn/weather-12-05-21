<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else-if="error">
    <img class="weather-bg" src="../assets/day.svg" alt="Street" />
    <PageNotFound />
  </div>
  <div v-else-if="weather">
    <img class="weather-bg" src="../assets/day.svg" alt="Street" />
    <div class="weather">
      <WeatherPlace :city="weather.city_name" />
      <WeatherNow
        :description="weather.data[0].weather.description"
        :temp="weather.data[0].temp"
        :maxTemp="weather.data[0].max_temp"
        :minTemp="weather.data[0].min_temp"
      />
      <ul class="weather-info">
        <WeatherInfoItem :info="formattedHumidity" subtitle="Humidity">
          <HumidityIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedPressure" subtitle="Pressure">
          <PressureIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedWind" subtitle="Wind">
          <WindIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedSunrise" subtitle="Sunrise">
          <SunriseIcon />
        </WeatherInfoItem>
        <WeatherInfoItem :info="formattedSunset" subtitle="Sunset">
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
            <SmallSunIcon />
          </span>
          <p class="weather-week__title big-txt">
            {{ formatDate(d.sunrise_ts) }}
          </p>
          <span class="weather-week__container">
            <span class="weather-week__text small-txt">
              {{ d.max_temp }}
              <span class="weather-week__icon"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__text small-txt">
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
import HumidityIcon from "../components/icons/HumidityIcon";
import PressureIcon from "../components/icons/PressureIcon";
import WindIcon from "../components/icons/WindIcon";
import SunriseIcon from "../components/icons/SunriseIcon";
import SunsetIcon from "../components/icons/SunsetIcon";
import DaytimeIcon from "../components/icons/DaytimeIcon";
import ArrowupIcon from "../components/icons/ArrowupIcon";
import ArrowdownIcon from "../components/icons/ArrowdownIcon";
import SmallSunIcon from "../components/icons/SmallSunIcon";
import WeatherInfoItem from "../components/WeatherInfoItem";
import WeatherPlace from "../components/WeatherPlace";
import WeatherNow from "../components/WeatherNow";
import Loader from "../components/Loader";
import axios from "axios";
import { DateTime } from "luxon";
import PageNotFound from "../components/PageNotFound";

export default {
  name: "Weather",
  components: {
    PageNotFound,
    Loader,
    WeatherNow,
    WeatherPlace,
    SmallSunIcon,
    ArrowdownIcon,
    ArrowupIcon,
    DaytimeIcon,
    SunsetIcon,
    SunriseIcon,
    WindIcon,
    PressureIcon,
    HumidityIcon,
    WeatherInfoItem,
  },
  data() {
    return {
      weather: null,
      loading: false,
      error: null,
    };
  },
  mounted() {
    this.getWeather();
  },
  computed: {
    formattedHumidity() {
      return this.weather.data[0].rh + `%`;
    },
    formattedPressure() {
      return this.weather.data[0].pres.toFixed(1) + `mBar`;
    },
    formattedWind() {
      return this.weather.data[0].wind_spd.toFixed(1) + ` km/h`;
    },
    formattedSunrise() {
      return DateTime.fromSeconds(this.weather.data[0].sunrise_ts).toFormat(
        "h:mm a"
      );
    },
    formattedSunset() {
      return DateTime.fromSeconds(this.weather.data[0].sunset_ts).toFormat(
        "h:mm a"
      );
    },
    formattedDaytime() {
      const dateOne = DateTime.fromSeconds(this.weather.data[0].sunrise_ts);
      const dateTwo = DateTime.fromSeconds(this.weather.data[0].sunset_ts);

      const diff = dateTwo.diff(dateOne, ["hours", "minutes"]);

      return diff.hours + `h ` + Math.round(diff.minutes) + "m";
    },
  },
  methods: {
    async getWeather() {
      this.loading = true;
      const url = `https://api.weatherbit.io/v2.0/forecast/daily`;
      try {
        const response = await axios.get(url, {
          params: {
            lat: "47.2362",
            lon: "38.8969",
            days: 7,
            key: process.env.VUE_APP_WEATHER_API_KEY,
          },
        });
        this.weather = response.data;
      } catch (error) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },
    formatDate(date) {
      return DateTime.fromSeconds(date).toFormat("ccc, dd");
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/styles/variables.css";
@import "../assets/styles/typography.css";

.weather-bg {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: -23px;
  background-color: var(--bg-img);
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
}

.weather-info {
  padding: 18px 10px 2px;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.weather-week {
  padding: 12px 20px 35px;
  margin: 0;
  list-style: none;
  display: inline-flex;
  overflow: auto;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 14px 18px 10px;
    margin-right: 20px;
    background-color: var(--color-white);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
    border-radius: 16px;

    &:last-child::before {
      position: absolute;
      content: "";
      right: -20px;
      bottom: 0;
      width: 20px;
      height: 101px;
      background-repeat: no-repeat;
      background-position: center;
    }
  }

  &__title {
    margin: 0;
  }

  &__container {
    display: flex;
    justify-content: space-between;
    width: 58px;
    padding: 5px 0;
    position: relative;
  }

  &__text {
    display: flex;
    align-items: center;
    color: var(--color-grey);
  }

  &__icon {
    &_state {
      padding: 0 0 10px;
    }
    padding-left: 2px;
  }
}
</style>

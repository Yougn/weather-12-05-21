<template>
  <div v-if="loading">
    <Loader />
  </div>
  <div v-else-if="weather">
    <img class="weather-bg" src="../assets/day.svg" alt="Street" />
    <div class="weather">
      <WeatherPlace :city="weather.city_name" />
      <WeatherNow
        :description="weather.data[0].weather.description"
        :temp="weather.data[0].temp"
        :max_temp="weather.data[0].max_temp"
        :min_temp="weather.data[0].min_temp"
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
            {{ formattedDate }}
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
import HumidityIcon from "../assets/icons/HumidityIcon";
import PressureIcon from "../assets/icons/PressureIcon";
import WindIcon from "../assets/icons/WindIcon";
import SunriseIcon from "../assets/icons/SunriseIcon";
import SunsetIcon from "../assets/icons/SunsetIcon";
import DaytimeIcon from "../assets/icons/DaytimeIcon";
import ArrowupIcon from "../assets/icons/ArrowupIcon";
import ArrowdownIcon from "../assets/icons/ArrowdownIcon";
import SmallSunIcon from "../assets/icons/SmallSunIcon";
import WeatherInfoItem from "../components/WeatherInfoItem";
import WeatherPlace from "../components/WeatherPlace";
import WeatherNow from "../components/WeatherNow";
import Loader from "../components/Loader";
import axios from "axios";
import { DateTime } from "luxon";

export default {
  name: "Weather",
  components: {
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
      return DateTime.fromSeconds(this.weather.data[0].sunset_ts * 2).toFormat(
        "h mm"
      );
    },
    formattedDate() {
      return DateTime.fromSeconds(this.weather.data[0].sunset_ts).toFormat(
        "ccc, dd"
      );
    },
  },
  methods: {
    // getWeather() {
    //   const hardcodedWeather = {
    //     city_name: "Taganrog",
    //     items: [
    //       {
    //         temp: "44",
    //         max_temp: "44°C",
    //         min_temp: "27°C",
    //         rh: "50%",
    //         pres: "1,007mBar",
    //         wind_spd: "30 km/h",
    //         sunrise_ts: "6:09 AM",
    //         sunset_ts: "7:09 PM",
    //         weather: {
    //           description: "Broken clouds",
    //         },
    //         daytime: "13h 0m",
    //         datetime: "Mon",
    //       },
    //       {
    //         temp: "43",
    //         max_temp: "44°C",
    //         min_temp: "27°C",
    //         rh: "50%",
    //         pres: "1,007mBar",
    //         wind_spd: "30 km/h",
    //         sunrise_ts: "6:09 AM",
    //         sunset_ts: "7:09 PM",
    //         weather: {
    //           description: "Broken clouds",
    //         },
    //         daytime: "13h 0m",
    //         datetime: "Tue",
    //       },
    //       {
    //         temp: "42",
    //         max_temp: "44°C",
    //         min_temp: "27°C",
    //         rh: "50%",
    //         pres: "1,007mBar",
    //         wind_spd: "30 km/h",
    //         sunrise_ts: "6:09 AM",
    //         sunset_ts: "7:09 PM",
    //         weather: {
    //           description: "Broken clouds",
    //         },
    //         daytime: "13h 0m",
    //         datetime: "Wed",
    //       },
    //       {
    //         temp: "41",
    //         max_temp: "44°C",
    //         min_temp: "27°C",
    //         rh: "50%",
    //         pres: "1,007mBar",
    //         wind_spd: "30 km/h",
    //         sunrise_ts: "6:09 AM",
    //         sunset_ts: "7:09 PM",
    //         weather: {
    //           description: "Broken clouds",
    //         },
    //         daytime: "13h 0m",
    //         datetime: "Wed",
    //       },
    //     ],
    //   };
    //   // this.loading = true;
    //   // setTimeout(() => {
    //   this.weather = hardcodedWeather;
    //   this.loading = false;
    //   // }, 2000);
    // },
    async getWeather() {
      const url =
        "https://api.weatherbit.io/v2.0/forecast/daily?lat=47.2362&lon=38.8969&days=7&key=43013e41df9f443290b1a400251307e7";
      try {
        let response = await axios.get(url);
        this.weather = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.css";
@import "../assets/styles/typography.css";
.weather-bg {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: -23px;
  background-color: var(--bg--img);
}

.weather {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background-color: var(--white);
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
    background-color: var(--white);
    box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.1);
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
    color: var(--grey);
  }

  &__icon {
    &_state {
      padding: 0 0 10px;
    }
    padding-left: 2px;
  }
}
</style>

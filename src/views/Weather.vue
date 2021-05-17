<template>
  <div>
    <img class="weather-bg" src="../assets/day.svg" alt="Street" />
    <div class="weather">
      <div class="weather-place">
        <p class="weather-place__date">{{ weather.date }}</p>
        <p class="weather-place__city">{{ weather.city_name }}</p>
      </div>
      <div class="weather-now">
        <p class="weather-now__state">
          <span>
            {{ weather.data[0].weather.description }}
          </span>
          <span><SunIcon /></span>
        </p>
        <p class="weather-now__temperature">{{ weather.data[0].temp }}</p>
        <p class="weather-peaks">
          <span class="weather-peaks__item weather-peaks__item_top">
            {{ weather.data[0].max_temp }}
          </span>
          <span class="weather-peaks__item weather-peaks__item_down">
            {{ weather.data[0].min_temp }}
          </span>
        </p>
      </div>
      <ul class="weather-info">
        <li class="weather-info__item">
          <span class="weather-info__icon"><HumidityIcon /></span>
          <p class="weather-info__text">{{ weather.data[0].rh }}</p>
          <span class="weather-info__subtitle">Humidity</span>
        </li>
        <li class="weather-info__item weather-info__item--pressure">
          <span class="weather-info__icon"><PressureIcon /></span>
          <p class="weather-info__text">{{ weather.data[0].pres }}</p>
          <span class="weather-info__subtitle">Pressure</span>
        </li>
        <li class="weather-info__item weather-info__item--wind">
          <span class="weather-info__icon"><WindIcon /></span>
          <p class="weather-info__text">{{ weather.data[0].wind_spd }}</p>
          <span class="weather-info__subtitle">Wind</span>
        </li>
        <li class="weather-info__item weather-info__item--sunrise">
          <span class="weather-info__icon"><SunriseIcon /></span>
          <p class="weather-info__text">{{ weather.data[0].sunrise_ts }}</p>
          <span class="weather-info__subtitle">Sunrise</span>
        </li>
        <li class="weather-info__item weather-info__item--sunset">
          <span class="weather-info__icon"><SunsetIcon /></span>
          <p class="weather-info__text">{{ weather.data[0].sunset_ts }}</p>
          <span class="weather-info__subtitle">Sunset</span>
        </li>
        <li class="weather-info__item weather-info__item--daytime">
          <span class="weather-info__item__svg"><DaytimeIcon /></span>
          <p class="weather-info__text">{{ weather.data[0].daytime }}</p>
          <span class="weather-info__subtitle">Daytime</span>
        </li>
      </ul>
      <ul class="weather-week">
        <li class="weather-week__item">
          <span class="weather-week__icon weather-week__icon_state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__title">
            {{ weather.data[0].datetime }}
          </p>
          <span class="weather-week__container">
            <span class="weather-week__text">
              {{ weather.data[0].max_temp }}
              <span class="weather-week__icon"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__text">
              {{ weather.data[0].min_temp }}
              <span class="weather-week__icon"><ArrowdownIcon /></span>
            </span>
          </span>
        </li>
        <li class="weather-week__item">
          <span class="weather-week__icon weather-week__icon_state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__title">Tue, 22</p>
          <span class="weather-week__container">
            <span class="weather-week__text">
              35°C
              <span class="weather-week__icon"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__text">
              27°C
              <span class="weather-week__icon"><ArrowdownIcon /></span>
            </span>
          </span>
        </li>
        <li class="weather-week__item">
          <span class="weather-week__icon weather-week__icon_state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__title">Wed, 22</p>
          <span class="weather-week__container">
            <span class="weather-week__text">
              35°C
              <span class="weather-week__icon"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__text">
              29°C
              <span class="weather-week__icon"><ArrowdownIcon /></span>
            </span>
          </span>
        </li>
        <li class="weather-week__item">
          <span class="weather-week__icon weather-week__icon_state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__title">Thur, 22</p>
          <span class="weather-week__container">
            <span class="weather-week__text">
              35°C
              <span class="weather-week__icon"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__text">
              30°C
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
import SunIcon from "../components/icons/SunIcon";
import SmallSunIcon from "../components/icons/SmallSunIcon";
export default {
  name: "Weather",
  components: {
    SmallSunIcon,
    SunIcon,
    ArrowdownIcon,
    ArrowupIcon,
    DaytimeIcon,
    SunsetIcon,
    SunriseIcon,
    WindIcon,
    PressureIcon,
    HumidityIcon,
  },
  data() {
    return {
      weather: null,
    };
  },
  mounted() {
    this.getWeather();
  },
  methods: {
    getWeather() {
      this.weather = {
        date: "Friday, 15 May 2021 10:00AM",
        city_name: "Taganrog, Russia",
        data: [
          {
            temp: "44",
            max_temp: "44°C",
            min_temp: "27°C",
            rh: "50%",
            pres: "1,007mBar",
            wind_spd: "30 km/h",
            sunrise_ts: "6:09 AM",
            sunset_ts: "7:09 PM",
            datetime: "Monday",
            weather: {
              description: "Broken clouds",
            },
            daytime: "13h 0m",
          },
          {
            temp: "43",
            max_temp: "44°C",
            min_temp: "27°C",
            rh: "50%",
            pres: "1,007mBar",
            wind_spd: "30 km/h",
            sunrise_ts: "6:09 AM",
            sunset_ts: "7:09 PM",
            datetime: "Monday",
            weather: {
              description: "Broken clouds",
            },
            daytime: "13h 0m",
          },
          {
            temp: "42",
            max_temp: "44°C",
            min_temp: "27°C",
            rh: "50%",
            pres: "1,007mBar",
            wind_spd: "30 km/h",
            sunrise_ts: "6:09 AM",
            sunset_ts: "7:09 PM",
            datetime: "Monday",
            weather: {
              description: "Broken clouds",
            },
            daytime: "13h 0m",
          },
          {
            temp: "41",
            max_temp: "44°C",
            min_temp: "27°C",
            rh: "50%",
            pres: "1,007mBar",
            wind_spd: "30 km/h",
            sunrise_ts: "6:09 AM",
            sunset_ts: "7:09 PM",
            datetime: "Monday",
            weather: {
              description: "Broken clouds",
            },
            daytime: "13h 0m",
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.weather-bg {
  width: 100%;
  max-height: 300px;
  object-fit: cover;
  margin-bottom: -23px;
  background-color: #8bccfb;
}

.weather {
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;
  background-color: white;
  box-shadow: 0px -16px 40px rgba(0, 0, 0, 0.2);
  border-radius: 24px 24px 0 0;
  overflow: hidden;
  z-index: 2;
}

.weather-place {
  display: flex;
  justify-content: space-between;

  &__date {
    margin: 0;
    max-width: 180px;
    padding: 15px 20px;
    font-size: 14px;
    line-height: 17px;
    text-align: left;
    color: #999999;
  }

  &__city {
    margin: 0 0 16px;
    padding: 14px 32px 15px 27px;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    text-align: center;
    color: #0da0ea;
    background: rgba(13, 159, 234, 0.08);
    border-radius: 0 0 0 25px;

    &::after {
      position: absolute;
      content: "";
      top: 18px;
      right: 18px;
      width: 12px;
      height: 12px;
      background-image: url("../assets/mark.svg");
      background-repeat: no-repeat;
      background-position: center;
    }
  }
}

.weather-now {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin: 0;
  padding: 10px 48px 20px;

  .weather-now__state {
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

  .weather-now__temperature {
    position: relative;
    margin: 0;
    font-weight: 300;
    font-size: 64px;
    line-height: 77px;
    letter-spacing: -0.05em;

    &::after {
      position: absolute;
      content: "°";
      top: 10px;
      left: 65px;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: #666666;
    }

    &::before {
      position: absolute;
      content: "C";
      top: 10px;
      left: 75px;
      font-weight: 500;
      font-size: 24px;
      line-height: 29px;
      color: #666666;
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
      color: #666666;

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

.weather-info {
  padding: 18px 10px 2px;
  margin: 0;
  list-style: none;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 33%;
    margin: 0 0 28px;
    letter-spacing: -0.05em;

    &:nth-child(4),
    &:nth-child(5),
    &:last-child {
      margin-bottom: 0;
    }
  }
  &__icon {
    padding-bottom: 10px;
  }

  &__text {
    margin: 0;
  }

  &__subtitle {
    padding: 5px 0 10px;
    font-size: 8px;
    line-height: 10px;
    letter-spacing: 0.1em;
    color: #999999;
  }
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
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.05em;
    background-color: white;
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
    font-size: 8px;
    line-height: 10px;
    text-align: center;
    letter-spacing: 0.1em;
    color: #999999;
  }

  &__icon {
    &_state {
      padding: 0 0 10px;
    }

    padding-left: 2px;
  }
}
</style>

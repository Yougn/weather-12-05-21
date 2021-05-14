<template>
  <div class="wrapper">
    <img src="../assets/day.svg" alt="Street" />
    <div class="weather">
      <div class="weather-place">
        <p class="weather-place__date">{{ weather.date }}</p>
        <p class="weather-place__city">{{ weather.city }}</p>
      </div>
      <div class="weather-now">
        <p class="weather-now__state">
          <span class="weather-now__state__text">
            {{ weather.currentState }}
          </span>
          <span class="weather-now__state__svg"><SunIcon /></span>
        </p>
        <p class="weather-now__temperature">{{ weather.currentTemperature }}</p>
        <p class="weather-now-peak">
          <span class="weather-now-peak__item weather-now-peak__item--top">
            {{ weather.temperaturesPick.top }}
          </span>
          <span class="weather-now-peak__item weather-now-peak__item--down">
            {{ weather.temperaturesPick.down }}
          </span>
        </p>
      </div>
      <ul class="weather-info">
        <li class="weather-info__item weather-info__item--humidity">
          <span class="weather-info__item__svg"><HumidityIcon /></span>
          <p class="weather-info__item__text">{{ weather.info.humidity }}</p>
          <span class="weather-info__item__subtitle">Humidity</span>
        </li>
        <li class="weather-info__item weather-info__item--pressure">
          <span class="weather-info__item__svg"><PressureIcon /></span>
          <p class="weather-info__item__text">{{ weather.info.pressure }}</p>
          <span class="weather-info__item__subtitle">Pressure</span>
        </li>
        <li class="weather-info__item weather-info__item--wind">
          <span class="weather-info__item__svg"><WindIcon /></span>
          <p class="weather-info__item__text">{{ weather.info.wind }}</p>
          <span class="weather-info__item__subtitle">Wind</span>
        </li>
        <li class="weather-info__item weather-info__item--sunrise">
          <span class="weather-info__item__svg"><SunriseIcon /></span>
          <p class="weather-info__item__text">{{ weather.info.sunrise }}</p>
          <span class="weather-info__item__subtitle">Sunrise</span>
        </li>
        <li class="weather-info__item weather-info__item--sunset">
          <span class="weather-info__item__svg"><SunsetIcon /></span>
          <p class="weather-info__item__text">{{ weather.info.sunset }}</p>
          <span class="weather-info__item__subtitle">Sunset</span>
        </li>
        <li class="weather-info__item weather-info__item--daytime">
          <span class="weather-info__item__svg"><DaytimeIcon /></span>
          <p class="weather-info__item__text">{{ weather.info.daytime }}</p>
          <span class="weather-info__item__subtitle">Daytime</span>
        </li>
      </ul>
      <ul class="weather-week">
        <li class="weather-week__item weather-week__item--mon">
          <span class="weather-week__item__svg weather-week__item__svg--state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__item__title">
            {{ weather.week[0].weekDate }}
          </p>
          <span class="weather-week__item__roll">
            <span class="weather-week__item__text">
              {{ weather.week[0].temperaturesPick.top }}
              <span class="weather-week__item__svg"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__item__text">
              {{ weather.week[0].temperaturesPick.down }}
              <span class="weather-week__item__svg"><ArrowdownIcon /></span>
            </span>
          </span>
        </li>
        <li class="weather-week__item weather-week__item--tue">
          <span class="weather-week__item__svg weather-week__item__svg--state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__item__title">Tue, 22</p>
          <span class="weather-week__item__roll">
            <span class="weather-week__item__text">
              35°C
              <span class="weather-week__item__svg"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__item__text">
              27°C
              <span class="weather-week__item__svg"><ArrowdownIcon /></span>
            </span>
          </span>
        </li>
        <li class="weather-week__item weather-week__item--wed">
          <span class="weather-week__item__svg weather-week__item__svg--state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__item__title">Wed, 22</p>
          <span class="weather-week__item__roll">
            <span class="weather-week__item__text">
              35°C
              <span class="weather-week__item__svg"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__item__text">
              29°C
              <span class="weather-week__item__svg"><ArrowdownIcon /></span>
            </span>
          </span>
        </li>
        <li class="weather-week__item weather-week__item--thur">
          <span class="weather-week__item__svg weather-week__item__svg--state">
            <SmallSunIcon />
          </span>
          <p class="weather-week__item__title">Thur, 22</p>
          <span class="weather-week__item__roll">
            <span class="weather-week__item__text">
              35°C
              <span class="weather-week__item__svg"><ArrowupIcon /></span>
            </span>
            <span class="weather-week__item__text">
              30°C
              <span class="weather-week__item__svg"><ArrowdownIcon /></span>
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
        city: "Taganrog, Russia",
        currentState: "Cloudy",
        currentTemperature: 44,
        temperaturesPick: {
          top: "44°C",
          down: "27°C",
        },
        info: {
          humidity: "50%",
          pressure: "1,007mBar",
          wind: "30 km/h",
          sunrise: "6:09 AM",
          sunset: "7:09 PM",
          daytime: "13h 0m",
        },
        week: [
          {
            state: "sunny",
            weekDate: "Mon, 21",
            temperaturesPick: {
              top: "44°C",
              down: "27°C",
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper img {
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
    padding: 14px 42px 15px 27px;
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

  .weather-now-peak {
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

      &--top::after {
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

      &--down::after {
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

    &--sunrise,
    &--sunset,
    &--daytime {
      margin-bottom: 0;
    }

    &__svg {
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

    &--thur::before {
      position: absolute;
      content: "";
      right: -20px;
      bottom: 0;
      width: 20px;
      height: 101px;
      background-repeat: no-repeat;
      background-position: center;
    }

    &__title {
      margin: 0;
    }

    &__roll {
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

    &__svg {
      &--state {
        padding: 0 0 10px;
      }

      padding-left: 2px;
    }
  }
}
</style>

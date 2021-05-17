<template>
  <li class="weather-info__item weather-info__item--humidity">
    <span class="weather-info__item__svg"><slot /></span>
    <p class="weather-info__item__text">{{ info }}</p>
    <span class="weather-info__item__subtitle">{{ subtitle }}</span>
  </li>
</template>

<script>
export default {
  name: "WeatherInfoItem",
  props: ['info', 'subtitle']
};
</script>

<style lang="scss" scoped>
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
</style>

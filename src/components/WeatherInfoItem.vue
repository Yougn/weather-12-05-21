<template>
  <li class="weather-info__item">
    <span class="weather-info__icon"><slot /></span>
    <p class="weather-info__text">{{ info }}</p>
    <span class="weather-info__subtitle">{{ subtitle }}</span>
  </li>
</template>

<script>
export default {
  name: "WeatherInfoItem",
  props: {
    info: { type: Number, required: true },
    subtitle: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables.css";
.weather-info {
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
    color: var(--grey);
  }
}
</style>

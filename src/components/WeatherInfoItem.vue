<template>
  <li class="weather-info__item">
    <span class="weather-info__icon"><slot /></span>
    <p class="weather-info__text title">{{ info }}</p>
    <span class="weather-info__subtitle subtitle">{{ subtitle }}</span>
  </li>
</template>

<script>
export default {
  name: "WeatherInfoItem",
  props: {
    info: { required: true },
    subtitle: { type: String, required: true },
  },
};
</script>

<style lang="scss" scoped>
.weather-info {
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 33%;
    margin: 0 0 28px;

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
    color: var(--color-grey);
  }
}
</style>

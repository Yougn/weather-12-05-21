<template>
  <li class="weather-info__item">
    <span class="weather-info__icon"><slot /></span>
    <p class="weather-info__text big-txt">{{ info }}</p>
    <span class="weather-info__subtitle small-txt">{{ subtitle }}</span>
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
// TODO ES: move globally
@import "../assets/styles/variables.css";
@import "../assets/styles/typography.css";
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

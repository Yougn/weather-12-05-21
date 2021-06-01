<template>
  <li class="weather-info__item">
    <span class="pb-4"><slot /></span>
    <p class="mb-0 title">{{ info }}</p>
    <span class="pt-1 pb-1 text-grey subtitle">{{ subtitle }}</span>
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
    @apply flex flex-col items-center relative w-1/3 mb-8;

    &:nth-child(4),
    &:nth-child(5),
    &:last-child {
      @apply mb-0;
    }
  }
}
</style>

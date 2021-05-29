<template>
  <li class="flex flex-col items-center relative w-1/3 mb-8 weather-info__item">
    <span class="pb-2"><slot /></span>
    <p class="mb-0 title">{{ info }}</p>
    <span class="pt-2 pb-2 text-grey subtitle">{{ subtitle }}</span>
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
    &:nth-child(4),
    &:nth-child(5),
    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

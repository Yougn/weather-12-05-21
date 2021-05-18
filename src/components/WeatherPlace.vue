<template>
  <div class="weather-place">
    <p class="weather-place__date">{{ date }}</p>
    <p class="weather-place__city">
      {{ city }}, Russia <span class="weather-place__icon"><MarkIcon /></span>
    </p>
  </div>
</template>

<script>
// TODO ES: use luxon.js https://moment.github.io/luxon/
// import dayjs from "dayjs";

import MarkIcon from "./icons/MarkIcon";
export default {
  name: "WeatherPlace",
  components: { MarkIcon },
  props: {
    date: { type: Number, required: true },
    city: { type: String, required: true },
  },
  computed: {
    // TODO ES:
    // formattedDate() {
    //   return dayjs.unix(this.date);
    // },
  },
};
</script>

<style lang="scss" scoped>
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
    padding: 14px 20px 15px 27px;
    font-size: 16px;
    font-weight: 500;
    line-height: 19px;
    text-align: center;
    color: #0da0ea;
    background: rgba(13, 159, 234, 0.08);
    border-radius: 0 0 0 25px;
  }

  &__icon {
    padding-left: 12px;
  }
}
</style>

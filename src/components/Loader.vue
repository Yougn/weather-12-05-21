<template>
  <div class="wrapper">
    <div class="loader-circle"></div>
  </div>
</template>

<script>
export default {
  name: "Loader",
};
</script>

<style lang="scss" scoped>
.wrapper {
  height: 100vh;
  display: grid;
  place-items: center;
  background-color: #0da0ea;
}
.loader-circle {
  width: 80px;
  height: 80px;
  border: 15px solid;
  border-color: #e6af2e #1b998b;
  border-radius: 50%;
  animation: spin 1.5s infinite;
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

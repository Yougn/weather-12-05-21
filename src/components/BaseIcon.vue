<template>
  <Component
    :is="require(`@/components/icons/${name}.svg`).default"
    class="BaseIcon"
    v-bind="$attrs"
    @v-on="$listeners"
  />
</template>

<script>
export default {
  name: "BaseIcon",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      required: true,
    },
  },
};
</script>

<style scoped></style>

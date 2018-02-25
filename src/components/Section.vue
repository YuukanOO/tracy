<template>
  <div class="section">
    <h2 class="section__title">{{title}}</h2>
    <div class="section__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Section',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.section {
  background-color: color(brand, 1);
  border-radius: 25px;
  box-shadow: 0 0 5px color(brand, -1);

  & + & {
    margin-top: baseline();
  }

  &__title {
    @include type(body);
    border-bottom: 1px solid color(brand, 2);
    color: color(text-inverse, 0);
    padding: baseline(0.5) baseline();
    font-weight: bold;
  }

  &__content {
    padding: baseline();
  }
}
</style>

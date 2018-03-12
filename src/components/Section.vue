<template>
  <div class="section">
    <div class="section__header">
      <h2 class="section__title">{{title}}</h2>
      <div class="section__actions">
        <slot name="actions" />
      </div>
    </div>
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
  margin-bottom: baseline();

  &__header {
    @include row($x: space-between, $y: center);
    border-bottom: 1px solid color(brand, 2);
    padding: baseline(0.5) baseline();
  }

  &__actions {
    @include row();
  }

  &__title {
    @include type(body);
    color: color(text-inverse, 0);
    font-weight: bold;
  }

  &__content {
    padding: baseline();
  }
}
</style>

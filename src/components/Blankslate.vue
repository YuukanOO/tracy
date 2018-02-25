<template>
  <div class="blankslate">
    <div class="blankslate__content">
      <h3 class="blankslate__title">{{title}}</h3>
      <p class="blankslate__subtitle"><slot /></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blankslate',
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

.blankslate {
  @include col($x: center, $y: center);
  color: color(text-inverse);
  flex: 1;

  &__title {
    @include type(h4);
    font-weight: bold;
  }

  &__subtitle {
    color: color(text-inverse, 1);
  }

  &__content {
    @include col($x: center, $y: center);
    padding: baseline() 0;
  }
}
</style>

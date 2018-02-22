<template>
  <div class="pagebar">
    <div class="pagebar__wrapper">
      <h1 class="pagebar__title">{{title}}</h1>
      <div class="pagebar__actions">
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Pagebar',
  props: {
    title: { type: String, required: true },
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.pagebar {
  padding: baseline(0.5) 0;

  &__title {
    @include type(body);
    color: color(text-inverse);
    font-weight: bold;
  }

  &__actions {
    @include row($x: flex-start, $y: center);
  }

  &__wrapper {
    @include row($x: space-between, $y: center);
    margin: 0 auto;
    max-width: $max-width;
    width: 100%;
  }
}
</style>

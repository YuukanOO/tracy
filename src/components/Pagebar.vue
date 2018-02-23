<template>
  <div class="pagebar">
    <h1 class="pagebar__title">{{title}}</h1>
    <div class="pagebar__actions">
      <slot />
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
  @include row($x: space-between, $y: center);

  margin-bottom: baseline();
  padding: baseline(0.5) 0;

  &__title {
    @include type(body);
    color: color(text-inverse);
    font-weight: bold;
  }

  &__actions {
    @include row($x: flex-start, $y: center);
  }
}
</style>

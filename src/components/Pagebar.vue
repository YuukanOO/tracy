<template>
  <div class="pagebar">
    <h1 class="pagebar__title"><span v-if="prefix">{{prefix}} <span class="pagebar__delimiter">/ </span></span>{{title}} <small>{{subtitle}}</small></h1>
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
    subtitle: String,
    prefix: String,
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.pagebar {
  @include row($x: space-between, $y: center, $wrap: nowrap);

  margin-bottom: baseline(0.5);
  padding: baseline(0.5) 0;

  &__title {
    @include type(body);
    color: color(text-inverse);
    font-weight: bold;
    overflow: hidden;
    padding: baseline(0.5) 0;
    text-overflow: ellipsis;
    white-space: nowrap;

    small {
      @include type(small);
      color: color(text-inverse, 1);
      font-weight: normal;
    }
  }

  &__delimiter {
    color: color(text-inverse, 1);
  }

  &__actions {
    @include row($x: flex-start, $y: center);
  }
}
</style>

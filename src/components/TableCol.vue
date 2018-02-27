<template>
  <td :class="{ 'table-col': true, 'table-col--title': title }">
    <slot />
  </td>
</template>

<script>
export default {
  name: 'TableCol',
  props: {
    title: Boolean,
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.table-col {
  @include type(small);
  background-color: white;
  color: color(text, 1);
  padding: baseline(0.5) baseline();

  &--title {
    @include type(body);
    color: color(brand);
    font-weight: bold;
  }
}
</style>

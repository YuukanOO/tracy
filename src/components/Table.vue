<template>
  <table :class="{ 'table': true, 'table--inverse': inverse }">
    <slot />
  </table>
</template>

<script>
export default {
  name: 'Table',
  props: {
    inverse: Boolean,
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.table {
  border-collapse: collapse;
  width: 100%;

  &--inverse {
    td {
      background-color: color(text-inverse, 2);
    }
  }
}
</style>

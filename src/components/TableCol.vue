<template>
  <td :class="{ 'table-col': true, 'table-col--title': title, 'table-col--action': action, 'table-col--input': input, 'table-col--optional': optional }">
    <slot />
  </td>
</template>

<script>
export default {
  name: 'TableCol',
  props: {
    title: Boolean,
    action: Boolean,
    input: Boolean,
    optional: Boolean,
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.table-col {
  @include type(small);
  background-color: white;
  color: color(text, 1);
  overflow: hidden;
  padding: baseline(0.5) baseline();

  &--title {
    @include type(body);
    color: color(brand);
    font-weight: bold;
  }

  &--input {
    padding: 0;
  }

  &--action {
    width: 40px;
    text-align: right;
  }

  &--optional {
    // TODO: on mobile, we can mask them
    
    // visibility: hidden;

    // @include on(tablet) {
    //   visibility: visible;
    // }
  }
}
</style>

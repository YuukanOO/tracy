<template>
  <div :class="{ 'checkbox': true, 'checkbox--checked': value }">
    <input type="checkbox" class="checkbox__input" :checked="value" @change="$emit('change', !value)" />
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    value: {},
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.checkbox {
  &::after {
    content: '';
    border: 1px solid color(brand);
    border-radius: 5px;
    color: black;
    display: inline-block;
    height: 16px;
    width: 16px;
    transition: all 0.2s;
  }

  &--checked {
    &::after {
      background-color: color(brand);
      transform: rotate(90deg);
    }

  }

  &__input {
    visibility: hidden;
  }
}
</style>


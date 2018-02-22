<template>
  <button @click="$emit('click', $event)" :class="{ 'btn': true, 'btn--inverse': inverse }">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    inverse: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.btn {
  @include type(small);

  background-color: transparent;
  border: 2px solid color(brand);
  border-radius: 100px;
  font-weight: bold;
  color: color(brand);
  cursor: pointer;
  padding: baseline(0.25) baseline(0.5);
  outline: none;
  text-decoration: none;
  transition: all 0.2s;

  & + & {
    margin-left: baseline();
  }

  &:focus {
    box-shadow: 0 0 10px color(brand);
  }

  &:hover {
    background-color: color(brand);
    color: color(text-inverse);
    transform: scale(1.1);
  }

  &:active {
    background-color: color(brand, -1);
    border-color: color(brand, -1);
    transform: scale(1);
  }

  &--inverse {
    border-color: color(text-inverse);
    color: color(text-inverse);

    &:focus {
      box-shadow: 0 0 10px color(brand, 2);
    }

    &:hover {
      background-color: color(text-inverse);
      color: color(brand);
    }
  }
}
</style>


<template>
  <button @click="$emit('click', $event)" :type="submit ? 'submit' : 'button'" 
    :class="{ 'btn': true, 'btn--inverse': inverse, 'btn--secondary': secondary, 'btn--danger': danger }">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'Btn',
  props: {
    submit: {
      type: Boolean,
      default: false,
    },
    danger: {
      type: Boolean,
      default: false,
    },
    inverse: {
      type: Boolean,
      default: false,
    },
    secondary: {
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
    margin-left: baseline(0.5);
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

  &--secondary {
    border-color: to-rgb(color(text, 1));
    color: color(text, 1);

    &:focus {
      box-shadow: 0 0 10px color(text, 1);
    }

    &:hover {
      background-color: color(text, 1);
    }

    &:active {
      border-color: to-rgb(color(text, 1));
    }
  }

  &--danger {
    border-color: color(danger);
    color: color(danger);

    &:focus {
      box-shadow: 0 0 10px color(danger);
    }

    &:hover {
      background-color: color(danger);
    }

    &:active {
      border-color: color(danger);
    }
  }
}
</style>


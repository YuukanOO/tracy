<template>
  <div :class="{ 'checkbox': true, 'checkbox--checked': value }" @click="$emit('input', !value)">
    <input type="checkbox" class="checkbox__input" :checked="value" @change="$emit('input', !value)" />
    <label v-if="label" class="checkbox__label">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'Checkbox',
  props: {
    label: String,
    value: {},
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.checkbox {
  cursor: pointer;
  padding-left: baseline(0.5);

  & + * {
    margin-top: baseline();
  }

  &::before {
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
    &::before {
      background-color: color(brand);
      transform: rotate(90deg);
    }
  }

  &__label {
    @include type(small);
    cursor: pointer;
    font-weight: bold;
    padding-left: baseline(0.5);
  }

  &__input {
    display: none;
  }
}
</style>


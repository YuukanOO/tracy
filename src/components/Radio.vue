<template>
  <div :class="{ 'radio' : true, 'radio--selected': modelValue === value }">
    <input type="radio" :id="_uid" :checked="modelValue === value" :value="value" @change="$emit('change', value)" class="radio__input">
    <label :for="_uid" class="radio__label">{{label}}</label>
  </div>
</template>

<script>
export default {
  name: 'Radio',
  model: {
    prop: 'modelValue',
    event: 'change',
  },
  props: {
    value: {},
    modelValue: String,
    label: String,
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.radio {
  background-color: white;
  border: 2px solid color(divider);
  border-left-width: 0;
  border-right-width: 0;
  padding: 5px;

  & + * {
    margin-top: baseline();
  }

  &:first-child {
    border-left-width: 2px;
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
  }

  &:last-child {
    border-right-width: 2px;
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
  }

  &__input {
    display: none;
  }

  &__label {
    @include type(small);
    border-radius: 25px;
    cursor: pointer;
    display: block;
    font-weight: bold;
    padding: baseline(0.25) baseline(0.5);
    text-align: center;
    transition: all 0.2s;
  }

  &--selected {
    .radio__label {
      background-color: color(brand);
      color: white;
    }
  }
}
</style>

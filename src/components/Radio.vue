<template>
  <div class="radio">
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
  & + * {
    margin-top: baseline();
  }

  &__label {
    @include type(small);
    font-weight: bold;
  }
}
</style>

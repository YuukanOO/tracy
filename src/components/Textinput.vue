<template>
  <div class="textinput">
    <label :for="_uid" class="textinput__label">{{label}}</label>
    <input 
      type="text" 
      :id="_uid" 
      class="textinput__input" 
      :value="value" 
      @input="$emit('input', $event.target.value)" />
  </div>
</template>

<script>
export default {
  name: 'Textinput',
  props: {
    value: {},
    label: String,
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.textinput {
  & + & {
    margin-top: baseline();
  }

  &__label {
    @include type(small);
    display: block;
    font-weight: bold;
    padding-left: baseline(0.5);
    padding-bottom: baseline(0.25);
  }

  &__input {
    @include type(small);
    background-color: transparent;
    border: 2px solid color(divider);
    border-radius: 100px;
    outline: none;
    padding: baseline(0.25) baseline(0.5);
    width: 100%;
    transition: all 0.2s;

    &:focus {
      border-color: color(brand);
      box-shadow: 0 0 10px color(brand);
    }

    &:hover {
      border-color: color(brand);
    }
  }
}
</style>


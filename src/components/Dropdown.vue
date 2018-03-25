<template>
  <div class="dropdown">
    {{value}} ▾
    <div class="dropdown__values">
      <div 
        :class="{ 'dropdown__value': true, 'dropdown__value--selected': v === value }" 
        @click.prevent="$emit('input', v)" 
        v-for="v in values" 
        :key="v">
        {{v}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dropdown',
  props: {
    value: String,
    values: Array,
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.dropdown {
  cursor: pointer;
  padding: baseline(0.5);
  position: relative;

  &:hover,
  &:focus {
    .dropdown__values {
      visibility: visible;
    }
  }

  &__values {
    background-color: white;
    border-radius: 25px;
    box-shadow: 0 0 5px color(brand, -1);
    position: absolute;
    transition: all 0.2s;
    visibility: hidden;
    text-align: center;
    min-width: 100px;
  }

  &__value {
    color: color(text);
    padding: baseline(0.5);
    transition: all 0.2s;

    & + & {
      border-top: 1px solid color(divider);
    }

    &--selected {
      color: color(brand);
      font-weight: bold;
    }
  }
}
</style>


<template>
  <div class="textinput">
    <input type="text" class="textinput__input" />
  </div>
</template>

<script>
export default {
  name: 'Textinput',
  props: {
    value: {},
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.textinput {
  &__input {
    
  }
}
</style>


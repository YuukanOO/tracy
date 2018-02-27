<template>
  <div class="checkbox">
    <input type="checkbox" :checked="value" @change="$emit('change', !value)" />
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

}
</style>


<template>
  <transition-group name="list-item" :tag="tag">
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>


<style lang="scss">
.list-item-enter, 
.list-item-leave-to {
  transform: scale(0) !important;
}
</style>


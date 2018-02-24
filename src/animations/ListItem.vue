<template>
  <transition-group name="list-item" tag="div">
    <slot />
  </transition-group>
</template>

<style lang="scss">
.list-item-enter, 
.list-item-leave-to {
  transform: scale(0) !important;
}
</style>


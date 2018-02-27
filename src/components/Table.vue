<template>
  <table class="table">
    <slot />
  </table>
</template>

<style lang="scss">
@import "./../_vars.scss";

.table {
  border-collapse: collapse;
  width: 100%;
}
</style>

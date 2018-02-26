<template>
  <div class="radio-group">
    <slot />
  </div>
</template>

<style lang="scss">
@import "./../_vars.scss";

.radio-group {
  @include row($y: center);

  & > * {
    margin-top: 0 !important;
    flex: 1;
  }

  & + * {
    margin-top: baseline();
  }
}
</style>


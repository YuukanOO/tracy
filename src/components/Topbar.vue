<template>
  <div class="topbar">
    <div class="topbar__wrapper">
      <router-link class="topbar__link" to="/">rasa-tinyui</router-link>
    </div>
  </div>
</template>

<style lang="scss">
@import "../_vars.scss";

.topbar {
  border-bottom: 1px solid color(brand, 1);
  padding: baseline(0.5) 0;

  &__wrapper {
    margin: 0 auto;
    max-width: $max-width;
    width: 100%;
  }

  &__link {
    @include type(small);
    color: color(text-inverse, -1);
    text-decoration: none;

    &:hover,
    &:focus {
      color: color(text-inverse);
    }
  }
}
</style>

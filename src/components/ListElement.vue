<template>
  <router-link :to="to" class="list-element">
    <span class="list-element__title">{{title}}</span>
    <span class="list-element__subtitle">{{subtitle}}</span>
  </router-link>
</template>

<script>
export default {
  name: 'ListElement',
  props: {
    to: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    subtitle: String,
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.list-element {
  background-color: white;
  border-radius: 25px;
  box-shadow: 0 0 5px color(brand, -2);
  display: block;
  transition: all 0.2s;
  outline: none;
  padding: baseline(0.5) baseline(1);
  text-decoration: none;
  transform: scale(1);

  & + & {
    margin-top: baseline();
  }

  &__title {
    color: color(brand);
    font-weight: bold;
  }

  &__subtitle {
    @include type(small);
    color: color(text, 1);
  }

  &:focus {
    box-shadow: 0 0 10px color(brand, 2);
  }

  &:hover {
    transform: scale(1.03);
  }

  &:active {
    transform: scale(1);
  }
}
</style>

<template>
  <router-link :class="{ 'card': true, 'card--title-only': !subtitle }" :to="to" @click.native="$emit('click', $event)">
    <span class="card__title">{{title}}</span>
    <span class="card__subtitle" v-if="subtitle">{{subtitle}}</span>
    <span class="card__meta">
      <slot />
    </span>
  </router-link>
</template>

<script>
export default {
  name: 'Card',
  props: {
    to: {
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

.card {
  background-color: white;
  border-radius: 35px;
  box-shadow: 0 0 5px color(brand, -1);
  outline: none;
  text-decoration: none;
  transition: all 0.2s;

  &__title {
    color: color(brand);
    padding: baseline();
    padding-bottom: 0;
    display: block;
    font-weight: bold;
  }

  &--title-only {
    .card__title {
      padding-bottom: baseline();
    }
  }

  &__subtitle {
    @include type(small);
    color: color(text, 1);
    display: block;
    padding: baseline();
    padding-top: 0;
  }

  &__meta {
    @include type(small);
    border-top: 1px solid color(divider);
    color: color(text, 1);
    display: block;
    text-align: right;
    padding: baseline(0.5) baseline();
  }

  transform: scale(1);

  &:focus {
    box-shadow: 0 0 10px color(brand, 2);
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
}
</style>


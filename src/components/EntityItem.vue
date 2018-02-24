<template>
  <a href="#" class="entity-item" @click="$emit('click', $event)">
    <span class="entity-item__name">{{entity.name}}</span>
    <span class="entity-item__meta">{{entity.type}}</span>
  </a>
</template>

<script>
export default {
  name: 'EntityItem',
  props: {
    entity: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.entity-item {
  background-color: white;
  border-radius: 35px;
  outline: none;
  text-decoration: none;
  transition: all 0.2s;

  &__name {
    color: color(brand);
    padding: baseline();
    display: block;
    font-weight: bold;
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

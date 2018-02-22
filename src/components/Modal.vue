<template>
  <div :class="{ 'modal':true, 'modal--opened': value }" @click.prevent="$emit('input', false)">
    <div class="modal__content" @click.stop="() => {}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    value: Boolean,
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.modal {
  @include col($x: center, $y: center);

  background-color: rgba(black, 0.32);
  display: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.2s;

  &__content {
    background-color: color(text-inverse);
    border-radius: 100px;
    padding: baseline();
    margin: baseline();
    transition: all 0.2s;
    transform: scale(0);
  }

  &--opened {
    display: flex;

    .modal__content {
      transform: scale(1);
    }
  }
}
</style>

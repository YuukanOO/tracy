<template>
  <transition name="fade">
    <div v-if="value" :class="{ 'modal':true, 'modal--opened': value }" @click.prevent="close">
      <div class="modal__card" @click.stop="() => {}">
        <h2 class="modal__title">{{title}}</h2>
        <div class="modal__content">
          <slot />
        </div>
        <div class="modal__actions">
          <btn @click.prevent="close" secondary>Cancel</btn>

          <slot name="actions" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Btn from './Btn.vue';

export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: true,
    },
    value: Boolean,
  },
  components: { Btn },
  methods: {
    close() {
      this.$emit('input', false);
    },
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.modal {
  @include col($x: center, $y: center);

  background-color: rgba(black, 0.42);
  overflow-y: scroll;
  padding: baseline();
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  transition: all 0.2s;

  &__title {
    @include type(body);
    border-bottom: 1px solid color(divider);
    color: color(brand);
    padding: baseline(0.5) baseline();
    font-weight: bold;
  }

  &__content {
    padding: baseline();
  }

  &__actions {
    @include row($x: flex-end, $y: center);

    border-top: 1px solid color(divider);
    padding: baseline(0.5) baseline();
  }

  &__card {
    background-color: color(text-inverse);
    box-shadow: 0 0 10px color(text);
    border-radius: 25px;
    width: 100%;
    transition: all 0.2s;
    transform: scale(1);

    @include on(tablet) {
      width: 450px;
    }
  }

  &.fade-enter, 
  &.fade-leave-to {
    opacity: 0;

    .modal__card {
      transform: scale(0);
    }
  }
}
</style>

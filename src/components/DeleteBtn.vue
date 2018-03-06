<template>
  <div class="delete-btn">
    <delete-tooltip v-if="!confirmationNeeded" />
    <button class="delete-btn__btn" @blur="confirmationNeeded = true" @click="clicked">-</button>
  </div>
</template>

<script>
import DeleteTooltip from './DeleteTooltip.vue';

export default {
  name: 'DeleteBtn',
  components: { DeleteTooltip },
  data() {
    return {
      confirmationNeeded: true,
    };
  },
  methods: {
    clicked(evt) {
      if (this.confirmationNeeded) {
        this.confirmationNeeded = false;
      } else {
        this.$emit('click', evt);
      }
    }
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.delete-btn {
  position: relative;

  &__btn {
    background-color: transparent;
    border: 2px solid color(danger);
    border-radius: 25px;
    color: color(danger);
    cursor: pointer;
    padding: 0 6px;
    transition: all 0.2s;

    &:focus {
      box-shadow: 0 0 10px color(danger);
    }

    &:hover {
      background-color: color(danger);
      color: color(text-inverse);
      transform: scale(1.3);
    }

    &:active {
      background-color: color(danger, -1);
      border-color: color(danger, -1);
      transform: scale(1);
    }
  }
}
</style>

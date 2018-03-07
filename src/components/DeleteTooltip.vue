<template>
  <div class="delete-tooltip">
      <p class="delete-tooltip__popup">
        Click to confirm
        <span class="delete-tooltip__triangle"></span>
      </p>
  </div>
</template>

<style lang="scss">
@import "./../_vars.scss";

.delete-tooltip {
  transition: all 0.2s;

  &__triangle {
    border-top: 12px solid black;
    border-left: 15px solid transparent;
    border-right: 15px solid transparent;
    display: block;
    height: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    position: absolute;
  }

  &__popup {
    @include type(tiny);
    background-color: black;
    border-radius: 15px;
    color: color(text-inverse);
    display: block;
    padding: baseline(0.25) baseline(0.5);
    position: absolute;
    left: 50%;
    bottom: 125%;
    text-align: center;
    transform: translateX(-50%);
    white-space: nowrap;
  }

  // &.pop-enter, 
  // &.pop-leave-to {
  //   transform: scale(0);
  // }
}
</style>

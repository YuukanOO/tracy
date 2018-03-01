<template>
  <button class="delete-btn" @click="$emit('click', $event)">-</button>
</template>

<style lang="scss">
@import "./../_vars.scss";

.delete-btn {
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
</style>

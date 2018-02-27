<template>
  <tr :class="{ 'table-row': true, 'table-row--clickable': clickable }" @click="$emit('click', $event)">
    <slot />
  </tr>
</template>

<script>
export default {
  name: 'TableRow',
  props: {
    clickable: Boolean,
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.table-row {
  transition: all 0.2s;

  & + & {
    border-top: 1px solid color(divider);
  }

  &--clickable {
    cursor: pointer;
  }

  &:first-child {
    & td:first-child {
      border-top-left-radius: 25px;
    }

    & td:last-child {
      border-top-right-radius: 25px;
    }
  }

  &:last-child {
    & td:first-child {
      border-bottom-left-radius: 25px;
    }

    & td:last-child {
      border-bottom-right-radius: 25px;
    }
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

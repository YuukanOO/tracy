<template>
  <div class="pagebar">
    <h1 class="pagebar__title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  name: 'Pagebar',
  props: {
    title: { type: String, required: true },
  },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.pagebar {
  margin: baseline(0.5) 0;
  
  &__title {
    @include type(body);
    font-weight: bold;
  }
}
</style>

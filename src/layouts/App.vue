<template>
  <div class="app">
    <topbar />
    <router-view class="app__content" />
  </div>
</template>

<script>
import Topbar from './../components/Topbar.vue';

export default {
  name: 'App',
  components: { Topbar },
}
</script>


<style lang="scss">
@import "../_vars.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  display: flex;
  height: 100%;
  font-size: 1.125em;
}

body {
  @include type(body);

  background-color: color(brand);
  color: color(text);
  display: flex;
  flex: 1;
  font-family: $font-family;
}

.app {
  @include col($x: stretch);
  flex: 1;
}
</style>

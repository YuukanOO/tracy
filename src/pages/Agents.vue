<template>
  <div class="agents">
    <pagebar title="Agents" />
  </div>
</template>

<script>
import Pagebar from './../components/Pagebar.vue';

export default {
  name: 'Agents',
  components: { Pagebar },
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.agents {
  flex: 1;
}
</style>

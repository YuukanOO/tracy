<template>
  <div class="entities">
    <pagebar title="Entities">
      <btn inverse>Add an entity</btn>
    </pagebar>

    <blankslate v-if="entities.length === 0" title="No entity yet!">
      Looks like you do not have any entity yet! Go ahead and create one!
    </blankslate>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Pagebar from './../components/Pagebar.vue';
import Blankslate from './../components/Blankslate.vue';
import Btn from './../components/Btn.vue';

export default {
  name: 'Entities',
  components: { Pagebar, Btn, Blankslate },
  computed: {
    ...mapGetters(['entities']),
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.entities {
  @include col($x: stretch, $y: flex-start);
  flex: 1;
}
</style>

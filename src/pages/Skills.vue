<template>
  <div class="skills">
    <pagebar title="Skills">
      <btn inverse>Add a skill</btn>
    </pagebar>

    <blankslate v-if="skills.length === 0" title="No skill yet!">
      Looks like you do not have any skill yet! Go ahead and create one!
    </blankslate>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Pagebar from './../components/Pagebar.vue';
import Blankslate from './../components/Blankslate.vue';
import Btn from './../components/Btn.vue';

export default {
  name: 'Skills',
  components: { Pagebar, Btn, Blankslate },
  computed: {
    ...mapGetters(['skills']),
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.skills {
  @include col($x: stretch, $y: flex-start);
  flex: 1;
}
</style>

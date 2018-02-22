<template>
  <div class="agents">
    <pagebar title="Agents">
      <btn inverse @click.prevent="createModal = true">Add an agent</btn>
    </pagebar>

    <modal v-model="createModal">
      <p>Hello from a modal!</p>
    </modal>
  </div>
</template>

<script>
import Pagebar from './../components/Pagebar.vue';
import Btn from './../components/Btn.vue';
import Modal from './../components/Modal.vue';

export default {
  name: 'Agents',
  components: { Pagebar, Btn, Modal },
  data() {
    return {
      createModal: false,
    };
  }
}
</script>


<style lang="scss">
@import "./../_vars.scss";

.agents {
  flex: 1;

  &__wrapper {
    margin: 0 auto;
    max-width: $max-width;
    width: 100%;
  }
}
</style>

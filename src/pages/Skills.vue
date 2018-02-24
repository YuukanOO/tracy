<template>
  <div class="skills">
    <pagebar title="Skills">
      <btn inverse @click.prevent="create">Add a skill</btn>
    </pagebar>

    <blankslate v-if="skills.length === 0" title="No skill yet!">
      Looks like you do not have any skill yet! Go ahead and create one!
    </blankslate>

    <form>
      <modal v-model="skillModal" title="Create a skill">
        <textinput label="Name" v-model="skill.name" />
        <textinput label="Description" v-model="skill.description" />

        <btn slot="actions" submit @click.prevent="save">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import Pagebar from './../components/Pagebar.vue';
import Blankslate from './../components/Blankslate.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Modal from './../components/Modal.vue';
import { actions } from './../store/agents';

export default {
  name: 'Skills',
  components: { Pagebar, Btn, Blankslate, Modal, Textinput },
  data() {
    return {
      skillModal: false,
      skill: {},
    };
  },
  computed: {
    ...mapGetters(['skills']),
  },
  methods: {
    create() {
      this.skill = { name: '', description: '' };
      this.skillModal = true;
    },
    async save() {
      await this.$store.dispatch(actions.upsertSkill.name, this.skill);
      this.skillModal = false;
    },
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

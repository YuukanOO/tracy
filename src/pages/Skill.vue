<template>
  <div class="skill">
    <pagebar :title="skill.name" :subtitle="skill.description">
      <btn inverse @click.prevent="edit">Edit skill</btn>
    </pagebar>

    <form>
      <modal title="Edit skill" v-model="skillModal">
        <textinput label="Name" v-model="data.name" />
        <textinput label="Description" v-model="data.description" />

        <btn slot="actions" danger @click.prevent="remove">Delete</btn>
        <btn submit slot="actions" @click.prevent="save">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { actions } from './../store/agents';

import Modal from './../components/Modal.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Pagebar from './../components/Pagebar.vue';

export default {
  name: 'Skill',
  components: { Pagebar, Btn, Modal, Textinput },
  data() {
    return {
      skillModal: false,
      data: {},
    };
  },
  computed: {
    skill() {
      return this.$store.getters.skill(this.$route.params.id);
    }
  },
  methods: {
    edit() {
      this.data = { ...this.skill };
      this.skillModal = true;
    },
    async remove() {
      await this.$store.dispatch(actions.removeSkill.name, this.data.id);
      this.$router.push({ name: 'skills' });
    },
    async save() {
      await this.$store.dispatch(actions.upsertSkill.name, this.data);
      this.skillModal = false;
    },
  },
}
</script>

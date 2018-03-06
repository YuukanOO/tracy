<template>
  <div class="skills">
    <pagebar title="Skills">
      <btn inverse @click.prevent="create">Add a skill</btn>
    </pagebar>

    <list-item class="skills__list">
      <card 
        v-for="skill in skills"
        :key="skill.id"
        class="skills__item"
        :to="{ name: 'skill', params: { id: skill.id } }"
        :title="skill.name"
        :subtitle="skill.description"
      >
        {{skill.intents.length}} intent{{skill.intents.length > 1 ? 's' : ''}}
      </card>
    </list-item>

    <blankslate v-if="skills.length === 0" title="No skill yet!">
      Looks like you do not have any skill yet! Go ahead and create one!
    </blankslate>

    <form>
      <modal v-model="skillModal" title="Create a skill">
        <textinput v-validate="'required'" label="Name" v-model="skill.name" name="name" data-vv-scope="skill" :err="errors.collect('name', 'skill')" />
        <textinput label="Description" v-model="skill.description" />

        <btn slot="actions" submit @click.prevent="save">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ListItem from './../animations/ListItem.vue';

import Pagebar from './../components/Pagebar.vue';
import Card from './../components/Card.vue';
import Blankslate from './../components/Blankslate.vue';
import Textinput from './../components/Textinput.vue';
import Btn from './../components/Btn.vue';
import Modal from './../components/Modal.vue';
import { actions } from './../store/agents';

export default {
  name: 'Skills',
  components: { Pagebar, Btn, Blankslate, Modal, Textinput, Card, ListItem },
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
      if (await this.$validator.validateAll('skill')) {
        await this.$store.dispatch(actions.upsertSkill.name, this.skill);
        this.skillModal = false;
      }
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.skills {
  @include col($x: stretch, $y: flex-start);
  flex: 1;

  &__list {
    @include row($gap: 27px);
  }

  &__item {
    @include cell(1, $grow: 0);

    @include on(tablet) {
      @include cell(1/3, $grow: 0);
    }

    @include on(desktop) {
      @include cell(1/4, $grow: 0);
    }
  }
}
</style>

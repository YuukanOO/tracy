<template>
  <div class="entities">
    <pagebar title="Entities">
      <btn inverse @click.prevent="create">Add an entity</btn>
    </pagebar>

    <list-item class="entities__list">
      <card
        @click.prevent="edit(entity)"
        to="#"
        v-for="entity in entities" 
        :key="entity.id" 
        class="entities__item" 
        :title="entity.name" 
      >
        {{entity.type}}
      </card>
    </list-item>

    <blankslate v-if="entities.length === 0" title="No entity yet!">
      Looks like you do not have any entity yet! Go ahead and create one!
    </blankslate>

    <form>
      <modal v-model="entityModal" :title="`${entity.id ? 'Update' : 'Create'} an entity`">
        <textinput v-validate="'required'" label="Name" v-model="entity.name" name="name" data-vv-scope="entity" :err="errors.collect('name', 'entity')" />
        <radio-group>
          <radio label="Values" value="values" v-model="entity.type" />
          <radio label="Regex" value="regex" v-model="entity.type" />
        </radio-group>
        <textinput label="Entity values" multiple v-model="entity.content" v-if="entity.type === 'values'" />
        <textinput label="Regex value" v-model="entity.content" v-if="entity.type === 'regex'" />

        <btn slot="actions" v-if="entity.id" @click.prevent="remove" danger>Delete</btn>
        <btn slot="actions" submit @click.prevent="save">Save</btn>
      </modal>
    </form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

import ListItem from './../animations/ListItem.vue';

import Card from './../components/Card.vue';
import Textinput from './../components/Textinput.vue';
import Radio from './../components/Radio.vue';
import RadioGroup from './../components/RadioGroup.vue';
import Pagebar from './../components/Pagebar.vue';
import Blankslate from './../components/Blankslate.vue';
import Modal from './../components/Modal.vue';
import Btn from './../components/Btn.vue';

import { actions } from './../store/agents';

export default {
  name: 'Entities',
  components: { Pagebar, Btn, Blankslate, Modal, Textinput, Radio, Card, ListItem, RadioGroup },
  data() {
    return {
      entityModal: false,
      entity: {},
    };
  },
  computed: {
    ...mapGetters(['entities']),
  },
  methods: {
    async save() {
      if (await this.$validator.validateAll('entity')) {
        await this.$store.dispatch(actions.upsertEntity.name, this.entity);
        this.entityModal = false;
      }
    },
    async remove() {
      await this.$store.dispatch(actions.removeEntity.name, this.entity.id);
      this.entityModal = false;
    },
    edit(entity) {
      this.entity = { ...entity };
      this.entityModal = true;
    },
    create() {
      this.entity = { name: '', type: 'values', content: '' };
      this.entityModal = true;
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.entities {
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

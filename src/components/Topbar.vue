<template>
  <div class="topbar">
    <div class="topbar__wrapper">
      <div>
        <router-link class="topbar__link" to="/">tracy <span class="topbar__version">{{version}}</span></router-link>

        <span class="topbar__mode-label">backend</span>
        <dropdown class="topbar__mode" @input="updateMode" :value="mode" :values="['rasa', 'snips']" />
      </div>
      <div>
        <router-link class="topbar__link" :to="{ name: 'agents' }">agents</router-link>
        <router-link class="topbar__link" :to="{ name: 'skills' }">skills</router-link>
        <router-link class="topbar__link" :to="{ name: 'entities' }">entities</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import Dropdown from './Dropdown.vue';

import { mapActions, mapGetters } from 'vuex';
import { actions } from './../store/settings';

export default {
  name: 'Topbar',
  components: { Dropdown },
  data() {
    return {
      version: VERSION,
    };
  },
  methods: {
    ...mapActions({ updateMode: 'updateMode' }),
  },
  computed: {
    ...mapGetters({ mode: 'mode'}),
  },
}
</script>


<style lang="scss">
@import "../_vars.scss";

.topbar {
  border-bottom: 1px solid color(brand, 1);
  padding: baseline(0.5) 0;

  &__wrapper {
    @include row($x: space-between, $y: center);

    margin: 0 auto;
    max-width: $max-width;
    padding: 0 baseline();
    width: 100%;

    @include on(desktop) {
      padding: 0;
    }

    & > * {
      @include row($y: center);
    }
  }

  &__mode {
    @include type(small);
    color: color(text-inverse);
    padding-top: 0;
    padding-bottom: 0;
  }

  &__mode-label {
    @include type(small);
    color: color(text-inverse, 1);
    margin-left: baseline(0.5);
  }

  &__version {
    @include type(tiny);
    background-color: color(brand, 1);
    border-radius: 25px;
    display: inline-block;
    padding: 2px 7px;
  }

  &__link {
    @include type(small);
    color: color(text-inverse);
    text-decoration: none;

    & + & {
      margin-left: baseline();
    }

    &:hover,
    &:focus {
      color: color(text-inverse, -1);
    }
  }
}
</style>

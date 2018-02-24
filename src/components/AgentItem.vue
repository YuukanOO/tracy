<template>
  <router-link :to="{ name: 'agent', params: { id: agent.id } }" class="agent-item">
    <span class="agent-item__name">{{agent.name}}</span>
    <span class="agent-item__description">{{agent.description}}</span>
    <span class="agent-item__meta">{{agent.skills.length}} skill{{agent.skills.length > 1 ? 's' : ''}}</span>
  </router-link>
</template>

<script>
export default {
  name: 'AgentItem',
  props: {
    agent: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
@import "./../_vars.scss";

.agent-item {
  background-color: white;
  border-radius: 35px;
  outline: none;
  text-decoration: none;
  transition: all 0.2s;

  &__name {
    color: color(brand);
    padding: baseline();
    padding-bottom: 0;
    display: block;
    font-weight: bold;
  }

  &__description {
    @include type(small);
    color: color(text, 1);
    display: block;
    padding: baseline();
    padding-top: 0;
  }

  &__meta {
    @include type(small);
    border-top: 1px solid color(divider);
    color: color(text, 1);
    display: block;
    text-align: right;
    padding: baseline(0.5) baseline();
  }

  transform: scale(1);

  &:focus {
    box-shadow: 0 0 10px color(brand, 2);
  }

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    transform: scale(1);
  }
}
</style>


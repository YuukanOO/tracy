import Vue from 'vue';
import app from './components/app.vue';
import './styles.scss';

const vm = new Vue({
  render: h => h(app),
});

vm.$mount('#root');

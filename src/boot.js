import Vue from 'vue';
import createStore from './store';
import App from './components/App.vue';
import './styles.scss';

const store = createStore();

const vm = new Vue({
  store,
  render: h => h(App),
});

vm.$mount('#root');

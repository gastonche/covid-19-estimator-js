// index.js

import Vue from 'vue';
import AppComponent from './pages/home.page.vue';

new Vue({
  render: (h) => h(AppComponent)
}).$mount('#app');

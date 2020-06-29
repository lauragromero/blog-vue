import { applyPolyfills, defineCustomElements } from 'blog-stencil/loader';
import Vue from 'vue';
import App from './App.vue';
import './main.css';
import router from './router';
import store from './store';



Vue.config.productionTip = false
Vue.config.ignoredElements = ['post-component', 'detail-card', 'detail-comment', 'list-component', 'header-component'];

applyPolyfills().then(() => {
  defineCustomElements(window);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


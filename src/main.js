import { applyPolyfills, defineCustomElements } from 'blog-stencil/loader';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';



Vue.config.productionTip = false
Vue.config.ignoredElements = ['post-component', 'grid-layout', 'detail-card', 'detail-comment'];

applyPolyfills().then(() => {
  defineCustomElements(window);
});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


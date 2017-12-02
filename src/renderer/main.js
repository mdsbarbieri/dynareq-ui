import Vue from 'vue';
import './assets/css/bulma.css';
import './assets/css/style.css';
import Store from './scripts/Store';
import App from './App';
import router from './router';
import VueStash from 'vue-stash';

Vue.use(VueStash);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.config.productionTip = false;

new Vue({
    components: { App },
    router,
    template: '<App/>',
    data: {
        store: Store
    }
}).$mount('#app');

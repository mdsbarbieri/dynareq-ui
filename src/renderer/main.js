import Vue from 'vue'
import './assets/css/bulma.css'
import './assets/css/style.css'
import App from './App'
import router from './router'
import VueStash from 'vue-stash';

Vue.use(VueStash);

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
    components: { App },
    router,
    template: '<App/>',
    data: {
        store: {
            global: {
                environment: {
                    name: "Production",
                    isProduction: true
                }
            },
            action: {}
        }
    }
}).$mount('#app')
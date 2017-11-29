import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'home',
            component: require('@/components/Home').default
        },
        {
            path: '/registerip',
            name: 'registerip',
            component: require('@/components/RegisterEnvironment').default
        },
        {
            path: '*',
            redirect: '/'
        }
    ]
})
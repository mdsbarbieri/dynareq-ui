import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
    routes: [{
        path: '/',
        name: 'home',
        component: require('@/components/Home').default
    },
    {
        path: '/registerEnvironment',
        name: 'registerEnvironment',
        component: require('@/components/RegisterEnvironment').default
    },
    {
        path: '/registerAction',
        name: 'registerAction',
        component: require('@/components/RegisterAction').default
    },
    {
        path: '/config',
        name: 'config',
        component: require('@/components/Config').default
    },
    {
        path: '*',
        redirect: '/'
    }
    ]
});

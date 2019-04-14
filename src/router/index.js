import Router from 'vue-router';

export default new Router({
    routes:[
        { path: '/', redirect: '/index'},
        { path: '/index', name: 'index', component: () => import('../views/home/home.vue') }
    ]
})
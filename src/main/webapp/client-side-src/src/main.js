import 'es6-promise/auto';
import Vue from 'vue'
import {Firebase} from './util/FirebaseUtils'
import firebaseAPI from './util/FirebaseUtils'
import VModal from 'vue-js-modal';
import VueRouter from 'vue-router';
import InstantSearch from 'vue-instantsearch';

import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import Search from './components/util/Search.vue';
import Book from './components/Book.vue';
import Spinner from './components/util/Spinner.vue';
import BookData from './components/BookData.vue';
import NotFound from './components/404.vue';
import Main from './components/Main.vue';

const fireAuth = Firebase.auth();
Vue.use(VModal, {dialog: true});
Vue.use(VueRouter);
Vue.use(InstantSearch);

Vue.prototype.$fireDB = Firebase.database();
Vue.prototype.$fireAuth = fireAuth;
Vue.prototype.$fireAPI = firebaseAPI;

const router = new VueRouter({
    saveScrollPosition: true,
    history: true,
    routes: [{
        path: '/',
        component: Main,
    }, {
        path: '/login',
        component: SignIn,
    }, {
        path: '/registration',
        component: SignUp
    }, {
        path: '/add',
        component: BookData,
        beforeEnter: (to, from, next) => {
            if (!fireAuth.currentUser) {
                next({
                    path: '/login'
                });
                return;
            }
            next();
        }
    }, {
        path: '/edit/:id',
        component: BookData,
        beforeEnter: (to, from, next) => {
            if (!fireAuth.currentUser) {
                next({
                    path: '/login'
                });
                return;
            }
            next();
        }
    }, {
        path: '/404/:id', component: NotFound, props: true
    }, {
        path: '/404', component: NotFound, props: true
    }, {
        path: '/book/:id', props: true, name: 'book',
        component: Book
    }]
});

const mainApp = new Vue({
    components: {
        'search-panel': Search,
        Spinner
    },
    router,
    el: '#app',
    data: {
        number: 0,
        cssData: '',
        auth: {
            user: null
        },
        spinner: {
            loading: false,
        },

    },

    computed: {
        isLogged: function () {
            return this.auth.user ? this.auth.user.emailVerified : false;
        }
    },

    methods: {

        signOut: function () {
            this.$fireAuth.signOut();
        },

        onBook: function (book) {
            router.push({path: `/book/${book.firebaseID}`});
        }
    },

});

fireAuth.onAuthStateChanged(function (user) {
    Vue.set(mainApp.auth, 'user', user);
});
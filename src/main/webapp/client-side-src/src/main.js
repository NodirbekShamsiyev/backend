import 'es6-promise/auto';
import Vue from 'vue'
import * as _ from "lodash";
// import axios from "axios";
import {Firebase} from './util/FirebaseUtils'
import VModal from 'vue-js-modal';
import VueRouter from 'vue-router';
import InstantSearch from 'vue-instantsearch';

import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';
import Search from './components/util/Search.vue';
import Book from './components/Book.vue';
import Spinner from './components/util/Spinner.vue';
import AddBook from './components/AddBook.vue';
import NotFound from './components/404.vue';

const fireAuth = Firebase.auth();
Vue.use(VModal, {dialog: true});
Vue.use(VueRouter);
Vue.use(InstantSearch);

Vue.prototype.$fireDB = Firebase.database();
Vue.prototype.$fireAuth = fireAuth;

const router = new VueRouter({
    saveScrollPosition: true,
    history: true,
    routes: [{
        path: '/login',
        component: SignIn,
    }, {
        path: '/registration',
        component: SignUp
    }, {
        path: '/addBook',
        component: AddBook
    }, {
        path: '/404/:id', component: NotFound, props: true
    }, {
        path: '/book/:id', props: true, name: 'book',
        component: Book,
        beforeEnter: (to, from, next) => {
            console.log(to);
            console.log(from);
            next();
        }
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

        changeSomeData: function (color) {
            this.cssData = color;
            this.userLogged = !this.userLogged;
        },

        changeNumber: _.debounce(function () {
            this.number++;
        }, 1000),

        onBook: function (book) {
            router.push({path: `/book/${book.firebaseID}`});
        }

    },

    watch: {
        // cssData: function (lastChange) {
        cssData: function () {
            this.changeNumber();
        },
        // 'signUp.email' :function () {
        //     this.checkEmail();
        // }
    }
});

fireAuth.onAuthStateChanged(function (user) {
    console.log(user);
    Vue.set(mainApp.auth, 'user', user);
});
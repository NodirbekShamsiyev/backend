import 'es6-promise/auto';
import Vue from 'vue'
import * as _ from "lodash";
// import axios from "axios";
// import * as firebase from "firebase";

import {Firebase} from './util/FirebaseUtils'

import VModal from 'vue-js-modal';
import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
import VueRouter from 'vue-router';
import SignIn from './components/SignIn.vue';
import SignUp from './components/SignUp.vue';

// import Vuetify from 'vuetify';
/*import App from './App.vue'

 new Vue({
 el: '#app',
 render: h => h(App)
 });
 */


const fireAuth = Firebase.auth();

//app instance
Vue.use(VModal, {dialog: true});
Vue.use(VueRouter);

const router = new VueRouter({
    routes: [{
        path: '/login',
        component: SignIn
    }, {
        path: '/registration',
        component: SignUp
    }]
});

const mainApp = new Vue({
    components: {
        PulseLoader
    },
    router,
    el: '#app',
    data: {
        number: 0,
        cssData: '',
        // signUp: {
        //     email: '',
        //     password: '',
        //     rePassword: '',
        //     name: '',
        //     lastName: ''
        // },
        spinner: {
            color: '#3AB982',
            size: '50px',
            margin: '2px',
            radius: '100%',
            loading: false
        }
    },

    // computed: {
    //     validation: function () {
    //         return {
    //             email: emailRE.test(this.signUp.email),
    //             password: this.signUp.password,
    //             emailSelf: this.signUp.email
    //         }
    //     },
    // },

    methods: {
        changeSomeData: function (color) {
            this.cssData = color;
            this.spinner.loading = !this.spinner.loading;
            // axios.get();
        },

        changeNumber: _.debounce(function () {
            this.number++;
        }, 1000),

        beforeOpen: function () {
            console.log("open")
        },
        beforeClose: function () {
            console.log("close")
        },
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
    // if (user && !user.emailVerified) {
    //     mainApp.$modal.show('dialog', {
    //         text: 'Please verify your email',
    //         buttons: [{title: 'Close'}]
    //     });
    // }
    // fireAuth.signOut().catch(error => {
    //     console.log(error);
    // })
});
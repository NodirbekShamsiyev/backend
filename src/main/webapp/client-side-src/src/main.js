import 'es6-promise/auto';
import Vue from 'vue'
import * as _ from "lodash";
import axios from "axios";
import * as firebase from "firebase";
import VModal from 'vue-js-modal'
// import Vuetify from 'vuetify';
/*import App from './App.vue'

 new Vue({
 el: '#app',
 render: h => h(App)
 });
 */

const emailRE = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const config = {
    apiKey: "AIzaSyD1Gw56VX47nQbUdTAEjidFivEKkRVhNgI",
    authDomain: "it-convergence-d39b2.firebaseapp.com",
    databaseURL: "https://it-convergence-d39b2.firebaseio.com",
    projectId: "it-convergence-d39b2",
    storageBucket: "it-convergence-d39b2.appspot.com",
    messagingSenderId: "503178303321"
};

firebase.initializeApp(config);
const fireAuth = firebase.auth();

//app instance
Vue.use(VModal, {dialog: true});
const mainApp = new Vue({
    el: '#app',
    data: {
        number: 0,
        cssData: '',
        signUp: {
            email: '',
            password: '',
            rePassword: '',
            name: '',
            lastName: ''
        },
        signIn: {
            email: '',
            password: ''
        }
    },

    computed: {
        validation: function () {
            return {
                email: emailRE.test(this.signUp.email),
                password: this.signUp.password,
                emailSelf: this.signUp.email
            }
        },
    },

    methods: {
        changeSomeData: function (color) {
            this.cssData = color;
            // axios.get();
        },

        changeNumber: _.debounce(function () {
            this.number++;
        }, 1000),

        registerUser: function () {
            let displayName = '' + this.signUp.name + ' ' + this.signUp.lastName;
            if (this.validation.email && this.validation.password) {
                fireAuth.createUserWithEmailAndPassword(this.validation.emailSelf, this.validation.password)
                    .then((user) => {
                        user.updateProfile({
                            displayName: displayName,
                            photoURL: ''
                        }).then(() => {
                            fireAuth.currentUser.reload().then(() => {
                                fireAuth.currentUser.sendEmailVerification().then(() => {//send verification email
                                    alert("Please verify your email");
                                    fireAuth.signOut().catch((error) => {
                                        console.log(error);
                                    })
                                }, (error) => {
                                    console.log(error);
                                });
                            })
                        })
                    }, (error) => {
                        console.log(error);
                    })
            }
        },

        login: function () {
            fireAuth.signInWithEmailAndPassword(this.signIn.email, this.signIn.password)
                .then((user) => {
                    if (!user.emailVerified) {
                        //-------------dialog-------------//
                        this.$modal.show('dialog', {
                            title: 'Alert!',
                            text: 'Please verify your email',
                            buttons: [{
                                title: 'Send verification email',
                                handler: () => {
                                    user.sendEmailVerification().then(() => {//resend verification email
                                        alert("Email sent");
                                        fireAuth.signOut().then(() => {
                                            this.$modal.hide('dialog');
                                        })
                                    }, (error) => {
                                        console.log(error);
                                    });
                                }
                            }, {title: 'Close'}]
                        });
                        //-------------dialog-------------//
                    }
                }, (error) => {
                    console.log(error);
                })
        }

    },

    watch: {
        cssData: function (lastChange) {
            this.changeNumber();
        },
        // 'signUp.email' :function () {
        //     this.checkEmail();
        // }
    }
});

fireAuth.onAuthStateChanged(function (user) {
    console.log(user);
});
<template>
    <div class="container">
        <spinner :loading="spinner.loading"></spinner>

        <form class="form-signin" v-on:submit.prevent="login">
            <h2 class="form-signin-heading">Please sign in</h2>
            <label for="inputEmail" class="sr-only">Email address</label>
            <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus
                   v-model="signIn.email"/>
            <label for="inputPassword" class="sr-only">Password</label>
            <input type="password" id="inputPassword" class="form-control" placeholder="Password" required
                   v-model="signIn.password"/>
            <button class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        </form>

    </div>
</template>
<script>
    import Spinner from './util/Spinner.vue'
    import {Firebase} from '../util/FirebaseUtils'
    import VModal from 'vue-js-modal';

    const fireAuth = Firebase.auth();
    export default {
        data() {
            return {
                signIn: {
                    email: '',
                    password: ''
                },
                spinner: {
                    loading: false,
                }
            }
        },

        components: {
            'spinner': Spinner
        },

        methods: {
            login: function () {
                this.spinner.loading = true;
                fireAuth.signInWithEmailAndPassword(this.signIn.email, this.signIn.password)
                    .then((user) => {
                        this.spinner.loading = false;
                        if (!user.emailVerified) {
                            //-------------dialog-------------//
                            this.$modal.hide('dialog');
                            this.$modal.show('dialog', {
                                text: 'Please verify your email',
                                buttons: [{
                                    title: 'Send verification email',
                                    handler: () => {
                                        this.spinner.loading = true;
                                        this.$modal.hide('dialog');
                                        Promise.all([
                                            user.sendEmailVerification()
                                                .then(() => {
                                                    fireAuth.signOut()
                                                }),
                                        ]).then(() => {
                                            this.spinner.loading = false;
                                            this.$modal.show('dialog', {
                                                text: 'Email was sent'
                                            });
                                        })
                                    }
                                }, {title: 'Close'}]
                            });
                            //-------------dialog-------------//
                        } else {
                            //route to main window
                        }
                    }, (error) => {
                        this.spinner.loading = false;
                    })
            }
        }
    }
</script>
<style>
    /*body {*/
    /*padding-top: 40px;*/
    /*padding-bottom: 40px;*/
    /*background-color: #eee;*/
    /*}*/

    .form-signin {
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
    }

    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }

    .form-signin .checkbox {
        font-weight: normal;
    }

    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }

    .form-signin .form-control:focus {
        z-index: 2;
    }

    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }

    .form-signin input[type="password"] {
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
</style>
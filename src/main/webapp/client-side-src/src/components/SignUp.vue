<template>
    <div class="container">
        <form class="form-horizontal" role="form">
            <h2>Registration Form</h2>
            <div class="form-group">
                <label for="firstName" class="col-sm-3 control-label">Full Name</label>
                <div class="col-sm-9">
                    <input type="text" id="firstName" placeholder="Full Name" class="form-control" autofocus>
                    <span class="help-block">Last Name, First Name, eg.: Smith, Harry</span>
                </div>
            </div>
            <div class="form-group">
                <label for="email" class="col-sm-3 control-label">Email</label>
                <div class="col-sm-9">
                    <input type="email" id="email" placeholder="Email" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="password" class="col-sm-3 control-label">Password</label>
                <div class="col-sm-9">
                    <input type="password" id="password" placeholder="Password" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="birthDate" class="col-sm-3 control-label">Date of Birth</label>
                <div class="col-sm-9">
                    <input type="date" id="birthDate" class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label class="control-label col-sm-3">Gender</label>
                <div class="col-sm-6">
                    <div class="row">
                        <div class="col-sm-4">
                            <label class="radio-inline">
                                <input type="radio" id="femaleRadio" value="Female">Female
                            </label>
                        </div>
                        <div class="col-sm-4">
                            <label class="radio-inline">
                                <input type="radio" id="maleRadio" value="Male">Male
                            </label>
                        </div>
                        <div class="col-sm-4">
                            <label class="radio-inline">
                                <input type="radio" id="uncknownRadio" value="Unknown">Unknown
                            </label>
                        </div>
                    </div>
                </div>
            </div> <!-- /.form-group -->
            <div class="form-group">
                <label class="control-label col-sm-3">Meal Preference</label>
                <div class="col-sm-9">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="calorieCheckbox" value="Low calorie">Low calorie
                        </label>
                    </div>
                    <div class="checkbox">
                        <label>
                            <input type="checkbox" id="saltCheckbox" value="Low salt">Low salt
                        </label>
                    </div>
                </div>
            </div> <!-- /.form-group -->
            <div class="form-group">
                <div class="col-sm-9 col-sm-offset-3">
                    <div class="checkbox">
                        <label>
                            <input type="checkbox">I accept <a href="#">terms</a>
                        </label>
                    </div>
                </div>
            </div> <!-- /.form-group -->
            <div class="form-group">
                <div class="col-sm-9 col-sm-offset-3">
                    <button type="submit" class="btn btn-primary btn-block">Register</button>
                </div>
            </div>
        </form> <!-- /form -->
        <spinner :loading="spinner.loading"></spinner>

        <form id="form" v-on:submit.prevent="registerUser">
            <input type="text" v-model="signUp.name" placeholder="Name">
            <input type="text" v-model="signUp.lastName" placeholder="Last name">
            <input type="email" v-model="signUp.email" placeholder="email@email.com">
            <input type="password" v-model="signUp.password" placeholder="Password">
            <input type="password" v-model="signUp.rePassword" placeholder="Repeat password">
            <input type="submit" value="Register">
        </form>
    </div>
</template>
<script>
    import Spinner from './util/Spinner.vue'
    import {Firebase} from '../util/FirebaseUtils'
    import VModal from 'vue-js-modal';

    const fireAuth = Firebase.auth();
    const emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    export default {

        components: {
            'spinner': Spinner
        },

        data() {
            return {
                signUp: {
                    email: '',
                    password: '',
                    rePassword: '',
                    name: '',
                    lastName: ''
                },
                spinner: {
                    loading: false,
                },

            }
        },
        methods: {
            registerUser: function () {
                if (this.validation.email && this.validation.password) {
                    this.spinner.loading = true;
                    fireAuth.createUserWithEmailAndPassword(this.validation.emailSelf, this.validation.password)
                        .then((user) => {
                            Promise.all([
                                user.updateProfile({
                                    displayName: '' + this.signUp.name + ' ' + this.signUp.lastName,
                                    photoURL: ''
                                }),
                                user.sendEmailVerification()]
                            ).then(() => {
                                fireAuth.signOut();
                                this.spinner.loading = false;
                            })
                        }).catch(error => {
                        console.log(error);
                        this.spinner.loading = false;

                    })
                }
            },
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
    }

</script>
<style>
    *[role="form"] {
        max-width: 530px;
        padding: 15px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 0.3em;
    }

    *[role="form"] h2 {
        margin-left: 5em;
        margin-bottom: 1em;
    }
</style>
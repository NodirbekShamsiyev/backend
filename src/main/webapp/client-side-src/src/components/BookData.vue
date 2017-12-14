<template>
    <div>
        <spinner :loading="spinner.loading"></spinner>

        <form class="form-horizontal" role="form" v-on:submit.prevent="submit">
            <h2>Book</h2>
            <div class="form-group">
                <label for="title" class="col-sm-3 control-label">Title</label>
                <div class="col-sm-9">
                    <input type="text" v-model="title" id="title" placeholder="Title"
                           class="form-control" autofocus>
                    <span class="help-block">Last Name, First Name, eg.: Smith, Harry</span>
                </div>
            </div>
            <div class="form-group">
                <label for="subtitle" class="col-sm-3 control-label">Subtitle</label>
                <div class="col-sm-9">
                    <input type="text" id="subtitle" v-model="subtitle" placeholder="Subtitle"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="author" class="col-sm-3 control-label">Author</label>
                <div class="col-sm-9">
                    <input type="text" id="author" v-model="author" placeholder="Authors"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="isbn" class="col-sm-3 control-label">ISBN</label>
                <div class="col-sm-9">
                    <input type="text" id="isbn" v-model="isbn" placeholder="ISBN"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="publisher" class="col-sm-3 control-label">Publisher</label>
                <div class="col-sm-9">
                    <input type="text" id="publisher" v-model="publisher" placeholder="Publisher"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="comment" class="col-sm-3 control-label">Description :</label>
                <div class="col-sm-9">
                    <textarea class="form-control" rows="5" id="comment" v-model="description"></textarea>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-9 col-sm-offset-3">
                    <button type="submit" class="btn btn-primary btn-block">Save</button>
                </div>
            </div>
        </form>

    </div>
</template>

<script>
    import Spinner from './util/Spinner.vue'
    import {adminIndex} from '../util/AlgoliaUtil'

    export default {
        components: {
            'spinner': Spinner
        },

        props: {
            props: {
                id: {
                    type: String,
                    required: false
                }
            },
        },

        methods: {
            submit() {
                this.spinner.loading = true;
                let bookRef = this.$fireDB.ref('book').push({
                    isbn: this.isbn,
                    title: this.title,
                    subtitle: this.subtitle,
                    author: this.author,
                    publisher: this.publisher,
                    description: this.description,
                    createdDate: this.$fireAPI.database.ServerValue.TIMESTAMP,
                    editedDate: this.$fireAPI.database.ServerValue.TIMESTAMP
                });

                bookRef.once('value').then(snapshot => {
                    let val = snapshot.val();

                    adminIndex.addObject({
                        isbn: val.isbn,
                        title: val.title,
                        subtitle: val.subtitle,
                        author: val.author,
                        publisher: val.publisher,
                        firebaseID: snapshot.key
                    }, (error, content) => {
                        this.spinner.loading = false;
                        console.log(content);
                        this.$router.push({path: `/book/${snapshot.key}`});
                    });
                });
            }
        },

        data() {
            return {
                isbn: '',
                title: '',
                subtitle: '',
                author: '',
                publisher: '',
                description: '',

                spinner: {
                    loading: false,
                }
            }
        },

        mounted() {
            if (!this.id)
                return;

            this.spinner.loading = true;
            const bookRef = this.$fireDB.ref('/book/' + this.id);
            bookRef.once('value').then(snapshot => {

                this.spinner.loading = false;

                if (!snapshot.exists()) {
                    this.$router.push({path: `/404/${this.id}`});
                    return;
                }

                let bookSnapshot = snapshot.val();
                this.title = bookSnapshot.title;
            });
        }
    }
</script>
<template>
    <div>
        <spinner :loading="spinner.loading"></spinner>

        <form class="form-horizontal" role="form" v-on:submit.prevent="addBook">
            <h2>Book</h2>
            <div class="form-group">
                <label for="title" class="col-sm-3 control-label">Title</label>
                <div class="col-sm-9">
                    <input type="text" v-model="book.title" id="title" placeholder="Title"
                           class="form-control" autofocus>
                    <span class="help-block">Last Name, First Name, eg.: Smith, Harry</span>
                </div>
            </div>
            <div class="form-group">
                <label for="subtitle" class="col-sm-3 control-label">Subtitle</label>
                <div class="col-sm-9">
                    <input type="text" id="subtitle" v-model="book.subtitle" placeholder="Subtitle"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="author" class="col-sm-3 control-label">Author</label>
                <div class="col-sm-9">
                    <input type="text" id="author" v-model="book.author" placeholder="Authors"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="isbn" class="col-sm-3 control-label">ISBN</label>
                <div class="col-sm-9">
                    <input type="text" id="isbn" v-model="book.isbn" placeholder="ISBN"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="publisher" class="col-sm-3 control-label">Publisher</label>
                <div class="col-sm-9">
                    <input type="text" id="publisher" v-model="book.publisher" placeholder="Publisher"
                           class="form-control">
                </div>
            </div>
            <div class="form-group">
                <label for="comment" class="col-sm-3 control-label">Description :</label>
                <div class="col-sm-9">
                    <textarea class="form-control" rows="5" id="comment" v-model="book.description"></textarea>
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
    import {Firebase} from '../util/FirebaseUtils'

    export default {
        components: {
            'spinner': Spinner
        },
        methods: {
            addBook() {
                console.log('saving book');
                this.$fireDB.ref('book').push(this.book, () => {
                    console.log('saved');
                })
            }
        },
        data() {
            return {
                book: {
                    isbn: '',
                    title: '',
                    subtitle: '',
                    author: '',
                    publisher: '',
                    description: ''
                },
                spinner: {
                    loading: false,
                }
            }
        }
    }
</script>
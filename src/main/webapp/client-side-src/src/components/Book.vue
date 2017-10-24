<template>
    <div>
        <spinner :loading="dataLoading"></spinner>
        <div v-if="failed">Loading failed</div>
        <div v-if="dataLoading">

            Loading...<br/>
            Show same html structure

        </div>
        <div v-else>
            <div>Book {{ book }}</div>
        </div>

    </div>
</template>

<script>
    import Spinner from './util/Spinner.vue'

    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },

        components: {
            'spinner': Spinner
        },

        data() {
            return {
                dataLoading: true,
                failed: false,
                book: {},
                bookRef: {},
            }
        },

        methods: {
            loadData(id) {
                this.dataLoading = true;
                console.log('Loading data with id =>' + id);
                this.bookRef = this.$fireDB.ref('/book/' + id);
                this.bookRef.once('value').then(snapshot => {
                    this.book = snapshot.val();
                    this.dataLoading = false;
                }, error => {
                    console.log(error);
                });
            }
        },

        mounted() {
            this.loadData(this.id);
        },

        watch: {
            '$route.params.id': function (id) {
                this.id = id;
                this.loadData(id);
            }
        }
    }
</script>
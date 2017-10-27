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

        <div id="disqus_thread"></div>
    </div>
</template>

<script>
    import Spinner from './util/Spinner.vue'
    import {DISQUS_CONFIG} from '../util/DISQUS';

    export default {
        props: {
            id: {
                type: String,
                required: true
            }
        },

        components: {
            'spinner': Spinner,
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
                this.loadComments();
            },

            initDisqus() {
                const self = this;

                const disqus_config = function () {
                    this.page.identifier = 'http://goodbooks.com/book/#!' + self.id;
                    this.page.url = 'http://goodbooks.com/book/#!' + self.id;
                };
                window.disqus_config = disqus_config;

                setTimeout(() => {
                    const d = document, s = d.createElement('script');
                    s.src = 'https://' + DISQUS_CONFIG.shortName + '.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', +new Date());
                    (d.head || d.body).appendChild(s);
                }, 2000);

            },

            resetDisqus(disqus) {
                const self = this;
                disqus.reset({
                    reload: true,
                    config: function () {
                        this.page.identifier = 'http://goodbooks.com/book/#!' + self.id;
                        this.page.url = 'http://goodbooks.com/book/#!' + self.id;
                    }
                });
            },

            loadComments() {
                if (window.DISQUS) {
                    this.resetDisqus(window.DISQUS);
                    console.log(window.DISQUS);
                    return
                }
                this.initDisqus();
            }
        },

        mounted() {
            this.loadData(this.id);
        },

        watch: {
            '$route.params.id': function (id) {
                this.id = id;
                this.loadData(id);
            },
        },


    }
</script>
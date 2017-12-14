<template>
    <div>
        <spinner :loading="dataLoading"></spinner>
        <div v-if="failed">Loading failed</div>
        <div v-if="dataLoading">

            Loading...<br/>
            Show same html structure

        </div>
        <div v-else>
            <div class="card-body">
                <h3 class="card-title">{{book.title}}</h3>
                <h4>{{book.author}}</h4>
                <p class="card-text">
                    {{book.description}}
                </p>
                <span class="text-warning">★ ★ ★ ★ ☆</span>
                4.0 stars
            </div>
        </div>

        <div id="disqus_thread"></div>
    </div>
</template>

<script>
    import Spinner from './util/Spinner.vue'
    import DISQUS_CONFIG from '../util/DISQUS';

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
                bookFormatted: {}
            }
        },

        methods: {
            loadData(id) {
                this.dataLoading = true;
                console.log('Loading data with id =>' + id);
                this.bookRef = this.$fireDB.ref('/book/' + id);
                this.bookRef.once('value').then(snapshot => {

                    this.dataLoading = false;

                    if (!snapshot.exists()) {
                        this.$router.push({path: `/404/${id}`});
                        return;
                    }

                    let bookData = snapshot.val();

                    this.book = {
                        isbn: bookData.isbn || 'no ISBN',
                        title: bookData.title,
                        subtitle: bookData.subtitle || 'no subtitle',
                        author: bookData.author || 'no author',
                        publisher: bookData.publisher || 'no publisher',
                        description: bookData.description || 'no description',
                        createdDate: bookData.createdDate,
                        createdDateFormatted: new Date(bookData.createdDate).toISOString(),
                        editedDate: bookData.editedDate,
                        editedDateFormatted: new Date(bookData.editedDate).toISOString(),
                    }

                }, error => {
                    console.log(error);
                });

                this.loadComments();
            },

            initDisqus() {
                const self = this;

                window.disqus_config = function () {
                    this.page.identifier = 'http://goodbooks.com/book/#!' + self.id;
                    this.page.url = 'http://goodbooks.com/book/#!' + self.id;
                };

                setTimeout(() => {
                    const d = document, s = d.createElement('script');
                    s.src = 'https://' + DISQUS_CONFIG.shortName + '.disqus.com/embed.js';
                    s.setAttribute('data-timestamp', new Date());
                    (d.head || d.body).appendChild(s);
                }, 1500);
            },

            resetDisqus(disqus) {
                disqus.reset({
                    reload: true,
                    config: window.disqus_config
                });
            },

            loadComments() {
                if (window.DISQUS) {
                    this.resetDisqus(window.DISQUS);
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
            message: function (message) {
                console.log('Data changed=>' + message);
            }
        },

    }
</script>
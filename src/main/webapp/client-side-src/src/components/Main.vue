<template>
    <div>
        <ul class="list-group">

            <li v-for="book in recentBooks" class="list-group-item text-center ">
                {{book.title}}  <router-link :to="{ path: book.link}" class="btn btn-info btn-xs ">More</router-link>
            </li>
        </ul>
    </div>
</template>

<script>

    export default {

        data() {
            return {
                recentBooks: [],
            }
        },

        methods: {
            loadRecentData: function () {
                const recentData = [];
                this.$fireDB.ref('book/').orderByChild('editedDate').limitToLast(5).once('value', snapshot => {
                    snapshot.forEach(child => {
                        let book = child.val();
                        recentData.push({
                            isbn: book.isbn || 'no ISBN',
                            title: book.title,
                            subtitle: book.subtitle || 'no subtitle',
                            author: book.author || 'no author',
                            publisher: book.publisher || 'no publisher',
                            description: book.description || 'no description',
                            createdDate: book.createdDate,
                            createdDateFormatted: new Date(book.createdDate).toISOString(),
                            editedDate: book.editedDate,
                            editedDateFormatted: new Date(book.editedDate).toISOString(),
                            link: `/book/${child.key}`
                        });
                    });

                    recentData.sort(function (a, b) {
                        return b.editedDate - a.editedDate;
                    });

                    recentData.forEach(book => {
                        this.recentBooks.push(book);
                    })
                });
            }
        },

        mounted: function () {
            this.loadRecentData();
        }
    }
</script>
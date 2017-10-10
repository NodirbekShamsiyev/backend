<template>
    <ais-index index-name="books" :search-store="searchStore">
        <div class="col-md-10 col-sm-9">

            <ais-search-box :autofocus="true">
                <div class="input-group">
                    <ais-input placeholder="Find books..."
                               :class-names="{'ais-input': 'form-control'}"
                               autofocus="true">
                    </ais-input>
                    <span class="input-group-btn">
                            <ais-clear :class-names="{'ais-clear': 'btn btn-default'}">
                                <span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
                            </ais-clear>
                            <button class="btn btn-default" type="submit">
                                <span class="glyphicon glyphicon-search" aria-hidden="true"></span>
                            </button>
                    </span>
                </div>
            </ais-search-box>

            <ais-results v-show="searchStore.query.length > 0">
                <template scope="{ result }">
                    <div v-on:click="searchResultClick(result)" class="found-item">
                        <a> <span>{{ result.title }}</span> <span>{{ result.author }}</span><span>{{ result.subtitle }}</span></a><br/>
                    </div>
                </template>
            </ais-results>

        </div>
    </ais-index>
</template>

<script>
    import {createFromAlgoliaCredentials} from 'vue-instantsearch';

    const searchStore = createFromAlgoliaCredentials('TY70EG43AB', 'ad50754214a919e6c5a9b352dbaac6d8');

    export default {
        data() {
            return {
                searchStore
            }
        },
        methods: {
            searchResultClick: function (book) {
                console.log('$emit child ===>');
                this.$emit('book-selected', book);
            }
        }
    }
</script>

<style>
    .ais-index {
        margin: auto;
        width: 75%;
        position: relative;
        min-height: 1px;
        height: 45px;
    }

    .ais-results:after {
        content: " ";
        display: block;
        clear: both;
    }

    .found-item {
        background-color: white;
        font: 16px arial, sans-serif;
        line-height: 34px;
        width: 88.5%;
        height: 34px !important;
        text-align: inherit;
        cursor: pointer;
    }

    .found-item:hover {
        background-color: whitesmoke;
    }

    .found-item span {
        margin-left: 15px;
    }
</style>
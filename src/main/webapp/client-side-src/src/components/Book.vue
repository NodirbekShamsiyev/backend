<template>
    <div>
        <spinner :loading="spinner.loading"></spinner>
        <div v-if="failed">Loading failed</div>
        <div v-if="dataLoaded">
        </div>
        <div v-else>
            Loading...<br/>
            Show same html structure
        </div>
        <div>User {{ id }}</div>
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
                dataLoaded: false,
                failed: false,
                spinner: {
                    loading: false,
                }
            }
        },
        mounted() {
            console.log('Load data....');
            //load data from firebase
            this.dataLoaded = true;
        }
    }
</script>
<template>
    <div>
        <pulse-loader :loading="loading" :color="color" :size="size"></pulse-loader>
    </div>
</template>
<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';

    export default {
        props: {
            loading: {
                type: Boolean,
                default: false
            },
            color: {
                type: String,
                default: '#3AB982'
            },
            size: {
                type: String,
                default: '50px'
            },
            margin: {
                type: String,
                default: '2px'
            },
            radius: {
                type: String,
                default: '100%'
            }
        },
        components: {
            PulseLoader
        },
        data() {
            return {}
        }
    }
</script>
<style>
    .v-spinner {
        position: fixed;
        z-index: 999;
        height: 2em;
        width: 15em;
        overflow: show;
        margin: auto;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    }

    /* Transparent Overlay */
    .v-spinner:before {
        content: '';
        display: block;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>
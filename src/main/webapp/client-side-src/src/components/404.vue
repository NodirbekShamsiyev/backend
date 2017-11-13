<template>
    <div>
        <div v-if="id">Requested resource with ID : {{id}} not found</div>
        <div v-else>Page not found</div>
    </div>
</template>
<script>
    export default {
        props: {
            id: {
                type: String,
                required: false
            }
        }
    }
</script>
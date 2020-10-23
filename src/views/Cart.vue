<template lang="html">
    <div class="cart">
        <Part v-for='part in storeCart' :part='part'></Part>
    </div>
</template>

<script>
import Part from '../components/Part.vue'

export default {
    components: {
        Part
    },
    computed: {
        storeCart(){
            return this.$store.state.storeCart
        }
    }
}
</script>

<style lang="css" scoped>
</style>

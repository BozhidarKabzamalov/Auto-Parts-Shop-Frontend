<template lang="html">
    <div class="admin-panel">

    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            orders: null
        }
    },
    methods: {
        async getOrders(){
            let response = await axios.get('http://localhost:3000/orders')
            console.log(response)
        }
    },
    mounted(){
        this.getOrders()
    }
}
</script>

<style lang="css" scoped>
</style>

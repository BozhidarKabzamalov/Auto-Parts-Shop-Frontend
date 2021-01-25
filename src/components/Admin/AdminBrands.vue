<template lang="html">
    <div class="admin-brands">
        <div class="input-container">
            <input type="text" v-model="brand.name" placeholder="Име">
        </div>
        <div @click="createBrand">Създай</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            brand: {
                name: ""
            }
        }
    },
    methods: {
        async createBrand(){
            let response = await axios.post("/createBrand", this.brand)
        }
    }
}
</script>

<style lang="css" scoped>

</style>

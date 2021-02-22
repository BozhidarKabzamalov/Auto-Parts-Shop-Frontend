<template lang="html">
    <div class="admin-brands">
        <div class="column-title">
            <p>Марки</p>
            <div class="create-button" @click="goToCreateBrand()">Добави</div>
        </div>
        <div class="brands">
            <div class="brand" v-for="brand in brands">
                <p>{{ brand.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from "../../router"

export default {
    data() {
        return {
            brands: null
        }
    },
    methods: {
        async getBrands(){
            try {
                let response = await axios.get("/brands")

                this.brands = response.data.brands
            } catch (e) {
                console.log(e)
            }
        },
        goToCreateBrand(){
            router.push({ name: "createBrand" })
        }
    },
    mounted(){
        this.getBrands()
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

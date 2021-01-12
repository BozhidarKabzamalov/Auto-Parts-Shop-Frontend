<template lang="html">
    <div class="admin-products">
        <div class="input-container">
            <input type="text" v-model="product.name" placeholder="Име">
        </div>
        <div class="input-container">
            <input type="text" v-model="product.description" placeholder="Описание">
        </div>
        <div class="input-container">
            <input type="text" v-model="product.price" placeholder="Цена">
        </div>
        <div class="input-container">
            <input type="text" v-model="product.manufacturer" placeholder="Производител">
        </div>
        <div class="input-container">
            <input type="text" v-model="product.serialNumber" placeholder="Сериен номер">
        </div>
        <div class="input-container">
            <select v-model="product.categoryId">
                <option disabled value="">Категория</option>
                <option v-for='category in categories' :value="category.id">{{ category.name }}</option>
            </select>
        </div>
        <div @click="createProduct">Създай</div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return {
            product: {
                name: "",
                description: "",
                price: "",
                manufacturer: "",
                serialNumber: "",
                image: "",
                categoryId: "",
            },
            categories: ""
        }
    },
    methods: {
        async createProduct(){
            let response = await axios.post("/createModel", this.product)
        },
        async getCategories(){
            let response = await axios.get('/categories')

            this.categories = response.data.categories
        }
    },
    mounted(){
        this.getCategories()
    }
}
</script>

<style lang="css" scoped>
</style>

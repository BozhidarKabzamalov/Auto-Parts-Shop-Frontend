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
            <input type="text" v-model="modelSearch" placeholder="Модел">
            <div v-if="models">
                <div v-for="model in models">
                    {{ model.name }}
                </div>
            </div>
        </div>
        <div class="input-container">
            <select v-model="product.categoryId">
                <option disabled value="">Категория</option>
                <option v-for='category in categories' :value="category.id">{{ category.name }}</option>
            </select>
        </div>
        <div class="input-container">
            <input type="file" name="image" @change="setProductImage($event)">
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
            categories: "",
            modelSearch: "",
            models: ""
        }
    },
    methods: {
        async createProduct(){
            let formData = new FormData();
            formData.append("name", this.product.name)
            formData.append("description", this.product.description)
            formData.append("price", this.product.price)
            formData.append("manufacturer", this.product.manufacturer)
            formData.append("serialNumber", this.product.serialNumber)
            formData.append("image", this.product.image)
            formData.append("categoryId", this.product.categoryId)

            let response = await axios.post("/createProduct", formData)
            console.log(response)
        },
        setProductImage(event){
            this.product.image = event.target.files[0]
        },
        async getCategories(){
            let response = await axios.get('/categories')

            this.categories = response.data.categories
        },
        async getModelsByName(){
            let response = await axios.get('/models/' + this.modelSearch)

            this.models = response.data.models
        }
    },
    watch: {
        modelSearch(){
            if (this.modelSearch) {
                this.getModelsByName()
            } else {
                this.models = ""
            }
        }
    },
    mounted(){
        this.getCategories()
    }
}
</script>

<style lang="css" scoped>
</style>

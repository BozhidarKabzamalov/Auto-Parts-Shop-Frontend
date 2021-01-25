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
        <div class="input-container relative-container">
            <input type="text" v-model="brandSearch" placeholder="Принадлежи на марка">
            <div class="absolute-container" v-if="brands.length">
                <div class="absolute-container-element" v-for="brand in brands" @click="addProductBrand(brand)">{{ brand.name }}</div>
            </div>
        </div>
        <div class="selected-models-container" v-if="product.brands.length">
            <div class="selected-models">
                <div class="selected-model" v-for="brand in product.brands" @click="removeProductBrand(brand)">{{ brand.name }}</div>
            </div>
        </div>
        <div class="input-container relative-container">
            <input type="text" v-model="modelSearch" placeholder="Принадлежи на модел">
            <div class="absolute-container" v-if="models.length">
                <div class="absolute-container-element" v-for="model in models" @click="addProductModel(model)">{{ model.name }}</div>
            </div>
        </div>
        <div class="selected-models-container" v-if="product.models.length">
            <div class="selected-models">
                <div class="selected-model" v-for="model in product.models" @click="removeProductModel(model)">{{ model.name }}</div>
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
                brands: [],
                models: []
            },
            categories: "",
            modelSearch: "",
            models: [],
            brandSearch: "",
            brands: []
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
            formData.append("brands", JSON.stringify(this.productModelsIds))
            formData.append("models", JSON.stringify(this.productModelsIds))

            let response = await axios.post("/createProduct", formData)
        },
        setProductImage(event){
            this.product.image = event.target.files[0]
        },
        addProductModel(model){
            this.modelSearch = ""
            this.models = ""
            this.product.models.push(model)
        },
        removeProductModel(model){
            let index = this.product.models.indexOf(model)
            this.product.models.splice(index, 1)
        },
        addProductBrand(brand){
            this.brandSearch = ""
            this.brands = ""
            this.product.brands.push(brand)
        },
        removeProductBrand(brand){
            let index = this.product.brands.indexOf(brand)
            this.product.brands.splice(index, 1)
        },
        async getCategories(){
            let response = await axios.get('/categories')

            this.categories = response.data.categories
        },
        async getModelsByName(){
            let response = await axios.get('/models/' + this.modelSearch)

            this.models = response.data.models
        },
        async getBrandsByName(){
            let response = await axios.get('/brands/' + this.brandSearch)

            this.brands = response.data.brands
        }
    },
    computed: {
        productBrandsIds(){
            return this.product.brands.map(brand => brand.id)
        },
        productModelsIds(){
            return this.product.models.map(model => model.id)
        }
    },
    watch: {
        modelSearch(){
            if (this.modelSearch) {
                this.getModelsByName()
            } else {
                this.models = []
            }
        },
        brandSearch(){
            if (this.brandSearch) {
                this.getBrandsByName()
            } else {
                this.brands = []
            }
        }
    },
    mounted(){
        this.getCategories()
    }
}
</script>

<style lang="css" scoped>
.relative-container {
    position: relative;
}
.absolute-container {
    display: flex;
    flex-wrap: wrap;
    background-color: #f1f1f1;
    padding: 15px;
    position: absolute;
    top: 100%;
    z-index: 1;
}
.absolute-container-element, .selected-model {
    border: 1px solid black;
    padding: 5px;
    font-size: 14px;
    margin-right: 10px;
    border-radius: 5px;
    cursor: pointer;
}
.absolute-container-element:last-child, .selected-model:last-child {
    margin-right: 0;
}
.selected-models-container {
    margin-bottom: 10px;
}
.selected-models {
    display: flex;
    flex-wrap: wrap;
}
.selected-model {
    margin-bottom: 10px;
}
</style>

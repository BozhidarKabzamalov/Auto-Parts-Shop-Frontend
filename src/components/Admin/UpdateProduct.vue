<template lang="html">
    <div class="create-product" v-if="product">
        <h1 class="column-title">Редактирай Продукт</h1>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.product.name.$error }" type="text" v-model="product.name" placeholder="Име">
        </div>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.product.description.$error }" type="text" v-model="product.description" placeholder="Описание">
        </div>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.product.price.$error }" type="number" min="1" max="9999" v-model="product.price" placeholder="Цена">
        </div>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.product.discount.$error }" type="number" min="1" max="100" v-model="product.discount" placeholder="Отстъпка">
        </div>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.product.manufacturer.$error }" type="text" v-model="product.manufacturer" placeholder="Производител">
        </div>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.product.serialNumber.$error }" type="text" v-model="product.serialNumber" placeholder="Сериен номер">
        </div>
        <div class="input-container relative-container">
            <input :class="{ 'validation-error': $v.product.brands.$error }" type="text" v-model="brandSearch" placeholder="Принадлежи на марка">
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
            <input :class="{ 'validation-error': $v.product.models.$error }" type="text" v-model="modelSearch" placeholder="Принадлежи на модел">
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
            <select :class="{ 'validation-error': $v.product.categoryId.$error }" v-model="product.categoryId">
                <option disabled value="">Категория</option>
                <option v-for='category in categories' :value="category.id">{{ category.name }}</option>
            </select>
        </div>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.product.image.$error }" type="file" name="image" @change="setProductImage($event)">
        </div>
        <div class="btn btn-primary" @click="updateProduct">Редактирай</div>
    </div>
</template>

<script>
import axios from "axios"
import router from '../../router'
import { required, minLength, maxLength, integer, minValue, maxValue } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            productId: this.$route.params.productId,
            product: this.$route.params.product,
            categories: "",
            modelSearch: "",
            models: [],
            brandSearch: "",
            brands: []
        }
    },
    validations: {
        product: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            description: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            price: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            discount: {
                minLength: minValue(0),
                maxLength: maxValue(100)
            },
            manufacturer: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            serialNumber: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            image: {
                required
            },
            categoryId: {
                required,
                integer
            },
            brands: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(99)
            },
            models: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(99)
            },
        }
    },
    methods: {
        async getProduct(){
            let response = await axios.get("/product/" + this.productId)
            console.log(response.data.product)
            if (response.data.product){
                this.product = response.data.product
            } else {
                router.push({ name: "404" })
            }
        },
        async updateProduct(){
            this.$v.$touch()

            if (!this.$v.$invalid) {
                try {
                    let formData = new FormData();
                    formData.append("id", this.product.id)
                    formData.append("name", this.product.name)
                    formData.append("description", this.product.description)
                    formData.append("price", this.product.price)
                    formData.append("discount", this.product.discount)
                    formData.append("manufacturer", this.product.manufacturer)
                    formData.append("serialNumber", this.product.serialNumber)
                    formData.append("image", this.product.image)
                    formData.append("categoryId", this.product.categoryId)
                    formData.append("brands", JSON.stringify(this.productBrandsIds))
                    formData.append("models", JSON.stringify(this.productModelsIds))

                    let response = await axios.post("/updateProduct", formData)

                    router.push({ name: "adminProducts" })
                } catch (e) {
                    console.log(e)
                }
            }
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
            try {
                let response = await axios.get('/categories')

                this.categories = response.data.categories
            } catch (e) {
                console.log(e)
            }
        },
        async getModelsByName(){
            try {
                let response = await axios.get('/models?searchQuery=' + this.modelSearch)

                this.models = response.data.models
            } catch (e) {
                console.log(e)
            }
        },
        async getBrandsByName(){
            try {
                let response = await axios.get('/brands?searchQuery=' + this.brandSearch)

                this.brands = response.data.brands
            } catch (e) {
                console.log(e)
            }
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
        this.getProduct()
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
.btn {
    width: 250px;
}
</style>

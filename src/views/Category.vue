<template lang="html">
    <div class="category">
        <div class="products-container">
            <div class="products">
                <Product v-for='product in products' :product='product'></Product>
            </div>
            <div v-for='page in totalPages' @click='currentPage = page'>{{ page }}</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Product from '../components/Product.vue'

export default {
    components: {
        Product
    },
    data(){
        return {
            model: this.$route.query.model,
            categoryId: this.$route.query.categoryId,
            currentPage: 1,
            products: null,
            totalItems: null,
            totalPages: null,
        }
    },
    methods: {
        async getProductsByCategory(){
            let response = await axios.get('http://localhost:3000/parts/' + this.categoryId + '?page=' + this.currentPage)
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
            this.products = response.data.parts
        },
        async getProductsByModelAndCategory(){
            let response = await axios.get('http://localhost:3000/parts/' + this.model + '/' + this.categoryId + '?page=' + this.currentPage)
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
            this.products = response.data.parts
        }
    },
    watch: {
        currentPage: function(){
            if (this.model === undefined) {
                this.getProductsByCategory()
            } else {
                this.getProductsByModelAndCategory()
            }
        }
    },
    mounted(){
        if (this.model === undefined) {
            this.getProductsByCategory()
        } else {
            this.getProductsByModelAndCategory()
        }
    }
}
</script>

<style lang="css" scoped>
.category {
    padding-top: 20px;
}
.products-container {
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
}
</style>

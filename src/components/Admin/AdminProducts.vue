<template lang="html">
    <div class="admin-products">
        <div class="column-title">
            <p>Продукти</p>
            <div class="create-button" @click="goToCreateProduct()">Добави</div>
        </div>
        <div class="products">
            <div class="product" v-for="product in products">
                <div class="product-image-container">
                    <img class='product-image' :src="product.image" :alt="product.name">
                </div>
                <p>{{ product.name }}</p>
                <div class="btn btn-danger" @click="deleteProduct(product.id)">Delete</div>
            </div>
        </div>
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @setCurrentPage="setCurrentPage"></Pagination>
    </div>
</template>

<script>
import axios from "axios"
import router from "../../router"
import Pagination from "../Pagination"

export default {
    components: {
        Pagination
    },
    data(){
        return {
            products: [],
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getProducts(){
            let response = await axios.get("/products?page=" + this.currentPage)

            this.products = response.data.products
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
        },
        async deleteProduct(productId){
            let response = await axios.post("/deleteProduct", { productId })

            console.log(response)
        },
        setCurrentPage(page){
            this.currentPage = page
        },
        goToCreateProduct(){
            router.push({ name: "createProduct" })
        }
    },
    watch: {
        currentPage(){
            this.getProducts()
        }
    },
    mounted(){
        this.getProducts()
    }
}
</script>

<style lang="css" scoped>
.column-title {
    margin-bottom: 0px;
}
.product {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    padding: 20px 0;
    font-size: 15px;
}
.product-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-right: 15px;
}
.product-image {
    display: block;
    max-height: 100%;
    max-width: 100%;
}
.btn {
    margin-left: auto;
    width: 100px;
}
</style>

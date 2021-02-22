<template lang="html">
    <div class="admin-products">
        <div class="column-title">
            <p>Продукти</p>
            <div class="create-button" @click="goToCreateProduct()">Добави</div>
        </div>
        <div class="products">
            <div class="product" v-for="product in products">
                <p>{{ product.id }}</p>
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
            products: null,
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

<style>
.column-title {
    display: flex;
    align-items: center;
}
.column-title > p {
    margin-right: 10px;
}
.create-button {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #999;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}
.create-button:hover {
    border: 1px solid #000;
}
</style>

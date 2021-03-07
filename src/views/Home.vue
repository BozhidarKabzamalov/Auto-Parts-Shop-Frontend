<template lang="html">
    <div class="home wrapper">
        <div class="column">
            <SearchByBrand></SearchByBrand>
        </div>
        <div class="column">
            <h1 class="column-title products-title">Нови продукти</h1>
            <div v-if="products.length">
                <div class="product-information">
                    <p class="product-image"></p>
                    <p class="product-name">Име</p>
                    <p class="product-manufacturer">Производител</p>
                    <p class="product-serial-number">Сериен №</p>
                    <p class="product-price">Цена</p>
                </div>
                <Product v-for='product in products' :product='product'></Product>
                <Pagination :currentPage="currentPage" :totalPages="totalPages" @setCurrentPage="setCurrentPage"></Pagination>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SearchByBrand from '../components/SearchByBrand'
import Product from '../components/Product'
import Pagination from '../components/Pagination'

export default {
    components: {
        Product,
        SearchByBrand,
        Pagination
    },
    data(){
        return {
            model: this.$route.query.model,
            categoryId: this.$route.query.categoryId,
            currentPage: 1,
            products: [],
            totalItems: null,
            totalPages: null,
        }
    },
    methods: {
        async getProducts(){
            if (this.model === undefined && this.categoryId === undefined) {
                var response = await axios.get('/products?page=' + this.currentPage)
            } else if (this.categoryId !== undefined && this.model === undefined) {
                var response = await axios.get('/products/' + this.categoryId + '?page=' + this.currentPage)
            } else {
                var response = await axios.get('/products/' + this.model + '/' + this.categoryId + '?page=' + this.currentPage)
            }
            this.products = response.data.products
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
        },
        setCurrentPage(page){
            this.currentPage = page
        }
    },
    watch: {
        $route (to, from){
            this.categoryId = this.$route.query.model
            this.model = this.$route.query.categoryId
            this.getProducts()
        },
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
.home {
    display: flex;
}
.column:first-child {
    margin-right: 15px;
}
.column:last-child {
    flex: 1;
    margin-left: 15px;
}
.product-information {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #dddddd;
}
.product-image {
    height: 1px;
    width: 100px;
    margin-right: 10px;
}
.product-name {
    width: 200px;
    margin-right: 10px;
}
.product-manufacturer, .product-serial-number {
    width: 120px;
    margin-right: 10px;
}
.product-price {
    width: 100px;
}

@media (max-width: 1450px) {
    .home {
        flex-direction: column;
    }
    .column:first-child {
        margin-right: 0;
    }
    .column:last-child {
        margin-left: 0;
    }
}

@media (max-width: 1080px) {
    .product-serial-number {
        display: none;
    }
}

@media (max-width: 860px) {
    .product-information {
        display: none;
    }
    .products-title {
        margin-bottom: 0;
    }
}
</style>

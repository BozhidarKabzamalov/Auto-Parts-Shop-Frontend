<template lang="html">
    <div class="home">
        <div class="column">
            <SearchByBrand></SearchByBrand>
        </div>
        <div class="column">
            <p class="column-title">Нови продукти</p>
            <div class="product-information">
                <p class="product-image"></p>
                <p class="product-name">Име</p>
                <p class="product-manufacturer">Производител</p>
                <p class="product-serial-number">Сериен №</p>
                <p class="product-price">Цена</p>
            </div>
            <Product v-for='product in products' :product='product'></Product>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SearchByBrand from '../components/SearchByBrand'
import Product from '../components/Product'

export default {
    components: {
        Product,
        SearchByBrand
    },
    data(){
        return {
            currentPage: 1,
            products: null,
            totalItems: null,
            totalPages: null,
        }
    },
    methods: {
        async getProducts(){
            let response = await axios.get('http://localhost:3000/parts?page=' + this.currentPage)
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
            this.products = response.data.parts
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
    padding: 20px 0;
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
    width: 80px;
}

@media (max-width: 500px) {
    .home {
        flex-direction: column;
    }
    .column:last-child {
        flex: 1;
        margin-left: 0px;
    }
}

</style>

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
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @setCurrentPage="setCurrentPage"></Pagination>
    </div>
</template>

<script>
import axios from 'axios'
import router from "../../router"
import Pagination from "../Pagination"

export default {
    components: {
        Pagination
    },
    data() {
        return {
            brands: null,
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getBrands(){
            try {
                let response = await axios.get("/brands?page=" + this.currentPage)

                this.brands = response.data.brands
                this.totalItems = response.data.totalItems
                this.totalPages = response.data.totalPages
            } catch (e) {
                console.log(e)
            }
        },
        setCurrentPage(page){
            this.currentPage = page
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
.column-title {
    margin-bottom: 0px;
}
.brand {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    padding: 20px 0;
    font-size: 15px;
}
.btn {
    width: 250px;
}
</style>

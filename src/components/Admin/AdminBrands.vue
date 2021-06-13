<template lang="html">
    <div class="admin-brands">
        <div class="column-title">
            <p>Марки</p>
            <div class="create-button" @click="goToCreateBrand()">Добави</div>
        </div>
        <div class="brands">
            <div class="brand" v-for="brand in brands">
                <p>{{ brand.name }}</p>
                <div class="buttons-container">
                    <div class="btn btn-secondary" @click="goToUpdateBrand(brand)">
                        <i class="far fa-edit"></i>
                    </div>
                    <div class="btn btn-danger" @click="deleteBrand(brand)">
                        <i class="far fa-trash-alt"></i>
                    </div>
                </div>
            </div>
            <Pagination :currentPage="currentPage" :totalPages="totalPages" @setCurrentPage="setCurrentPage"></Pagination>
        </div>
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
            brands: [],
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
        async deleteBrand(brand){
            try {
                let response = await axios.post('/deleteBrand', { brandId: brand.id })

                let index = this.brands.indexOf(brand)
                this.brands.splice(index, 1)
            } catch (e) {
                console.log(e)
            }
        },
        setCurrentPage(page){
            this.currentPage = page
        },
        goToCreateBrand(){
            router.push({ name: "createBrand" })
        },
        goToUpdateBrand(brand){
            router.push({ name: "updateBrand", params: { brandId: brand.id, brand: brand } })
        }
    },
    watch: {
        currentPage(){
            this.getBrands()
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
.buttons-container {
    display: flex;
    margin-left: auto;
}
.btn {
    width: 100px;
}
.btn:first-child {
    margin-right: 10px;
}

@media (max-width: 860px) {
    .brand {
        flex-direction: column;
    }
    .buttons-container {
        margin-top: 20px;
        margin-left: 0px;
    }
}
</style>

<template lang="html">
    <div class="admin-categories">
        <div class="column-title">
            <p>Категории</p>
            <div class="create-button" @click="goToCreateCategory()">Добави</div>
        </div>
        <div class="categories">
            <div class="category" v-for="category in categories">
                <p>{{ category.name }}</p>
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
            categories: null,
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getCategories(){
            let response = await axios.get("/categories?page=" + this.currentPage)

            this.categories = response.data.categories
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
        },
        setCurrentPage(page){
            this.currentPage = page
        },
        goToCreateCategory(){
            router.push({ name: "createCategory" })
        }
    },
    watch: {
        currentPage(){
            this.getCategories()
        }
    },
    mounted(){
        this.getCategories()
    }
}
</script>

<style lang="css" scoped>

</style>

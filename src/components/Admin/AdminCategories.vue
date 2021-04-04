<template lang="html">
    <div class="admin-categories">
        <div class="column-title">
            <p>Категории</p>
            <div class="create-button" @click="goToCreateCategory()">Добави</div>
        </div>
        <div class="categories">
            <div class="category" v-for="category in categories">
                <div class="category-image-container">
                    <img class='category-image' :src="category.image" :alt="category.name">
                </div>
                <p>{{ category.name }}</p>
                <div class="buttons-container">
                    <div class="btn btn-secondary" @click="goToUpdateCategory(category)"><i class="far fa-edit"></i></div>
                    <div class="btn btn-danger" @click="deleteCategory(category)"><i class="far fa-trash-alt"></i></div>
                </div>
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
            categories: [],
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getCategories(){
            try {
                let response = await axios.get("/categories?page=" + this.currentPage)

                this.categories = response.data.categories
                this.totalItems = response.data.totalItems
                this.totalPages = response.data.totalPages
            } catch (e) {
                console.log(e)
            }
        },
        async deleteCategory(category){
            try {
                let response = await axios.post("/deleteCategory", { categoryId: category.id })

                let index = this.categories.indexOf(category)
                this.categories.splice(index, 1)
            } catch (e) {
                console.log(e)
            }
        },
        setCurrentPage(page){
            this.currentPage = page
        },
        goToCreateCategory(){
            router.push({ name: "createCategory" })
        },
        goToUpdateCategory(category){
            router.push({ name: "updateCategory", params: { categoryId: category.id, category: category } })
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
.column-title {
    margin-bottom: 0px;
}
.category {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    padding: 20px 0;
    font-size: 15px;
}
.category-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-right: 15px;
}
.category-image {
    display: block;
    max-height: 100%;
    max-width: 100%;
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
</style>

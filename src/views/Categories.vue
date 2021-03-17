<template>
    <div class="wrapper">
        <h1 class="column-title">Категории</h1>
        <div class="categories">
            <div class='category' v-for='category in categories' @click='goToCategory(category)'>
                <div class="category-image-wrapper">
                    <img class='category-image' :src="category.image" :alt="category.name">
                </div>
                <p class='category-name'>{{ category.name }}</p>
            </div>
        </div>
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @setCurrentPage="setCurrentPage"></Pagination>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import Pagination from '../components/Pagination'

export default {
    metaInfo: {
      title: 'Категории | '
    },
    components: {
        Pagination
    },
    data(){
        return {
            categories: null,
            brand: this.$route.query.brand,
            model: this.$route.query.model,
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getCategories(){
            let response = await axios.get('/categories?page=' + this.currentPage)

            this.categories = response.data.categories
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
        },
        setCurrentPage(page){
            this.currentPage = page
        },
        goToCategory(category){
            router.push({ name: 'home', query: { brand: this.brand, model: this.model, categoryId: category.id } })
        }
    },
    mounted(){
        this.getCategories()
    }
}
</script>

<style lang="css" scoped>
.categories {
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    width: 100%;
    column-gap: 20px;
    justify-content: center;
}
.category {
    background-color: #ffffff;
    width: 240px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    padding: 20px;
    margin-bottom: 20px;
    border-radius: 5px;
    border: 1px solid #dee2e6;
    transition: all .2s ease-in-out;
}
.category:hover {
    border-color: #aaa;
}
.category-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
}
.category-image {
    max-height: 100%;
    max-width: 100%;
    display: block;
}
.category-name {
    font-size: 14px;
    text-align: center;
    word-break: break-all;
    margin: 20px 0 0 0;
}
</style>

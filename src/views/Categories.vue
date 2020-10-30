<template>
    <div class="categories">
        <div class='category' v-for='category in categories' @click='goToCategory(category)'>
            <div class="category-image">
                <img class='responsive-image' :src="category.image" :alt="category.name">
            </div>
            <p class='category-name'>{{ category.name }}</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data(){
        return {
            categories: null,
            brand: this.$route.query.brand,
            model: this.$route.query.model
        }
    },
    methods: {
        async getCategories(){
            let response = await axios.get('http://localhost:3000/categories')
            this.categories = response.data
        },
        goToCategory(category){
            router.push({ name: 'category', query: { brand: this.brand, model: this.model, categoryId: category.id } })
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
    grid-template-columns: repeat(auto-fill, 200px);
    width: 100%;
    padding-top: 20px;
    justify-content: space-evenly;
    align-content: flex-start;
}
.category {
    width: 200px;
    display: flex;
    flex-direction: column;
    justify-content:space-between;
    align-items: center;
    cursor: pointer;
    transition: all .2s ease-in-out;
    padding: 10px;
    border: 2px solid rgba(0, 0, 0, 0.5);
    margin-bottom: 20px;
}
.category-image img {
    display: block;
}
.category-name {
    text-align: center;
    margin: 20px 0 10px 0;
}
</style>

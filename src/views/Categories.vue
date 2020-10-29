<template>
    <div class="categories">
        <div class='category' v-for='category in categories' @click='goToCategory(category)'>
            <img :src="category.image" :alt="category.name">
            <p>{{ category.name }}</p>
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
    display: flex;
}
.category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-right: 40px;
    cursor: pointer;
}
</style>

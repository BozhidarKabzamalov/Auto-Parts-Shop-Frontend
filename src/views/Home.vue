<template>
    <div class="home">
        <div class="wrapper">
            <div v-for='category in categories' @click='goToCategory(category.id)'>
                {{ category.name }}
                <img :src="category.image" :alt="category.name">
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data(){
        return {
            categories: null
        }
    },
    methods: {
        async getCategories(){
            let response = await axios.get('http://localhost:3000/categories')
            this.categories = response.data
            console.log(response)
        },
        goToCategory(categoryId){
            router.push({ name: 'Category', params: { categoryId: categoryId } })
        }
    },
    mounted(){
        this.getCategories()
    }
}
</script>

<style lang="css" scoped>
</style>

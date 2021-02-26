<template lang="html">
    <div class="create-category">
        <h1 class="column-title">Добави Категория</h1>
        <div class="input-container">
            <input type="text" v-model="category.name" placeholder="Име">
        </div>
        <div class="input-container">
            <input type="file" name="image" @change="setCategoryImage($event)">
        </div>
        <div class="btn btn-primary" @click="createCategory">Създай</div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'

export default {
    data() {
        return {
            category: {
                name: "",
                image: null
            }
        }
    },
    methods: {
        async createCategory(){
            let formData = new FormData();
            formData.append("name", this.category.name)
            formData.append("image", this.category.image)

            let response = await axios.post("/createCategory", formData)

            router.push({ name: "adminCategories"})
        },
        setCategoryImage(event){
            this.category.image = event.target.files[0]
        }
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

<template lang="html">
    <div class="admin-categories">
        <div class="input-container">
            <input type="text" v-model="category.name" placeholder="Име">
        </div>
        <div class="input-container">
            <input type="file" name="image" @change="setCategoryImage($event)">
        </div>
        <div @click="createCategory">Създай</div>
    </div>
</template>

<script>
import axios from 'axios'

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
        },
        setCategoryImage(event){
            this.category.image = event.target.files[0]
        }
    }
}
</script>

<style lang="css" scoped>

</style>

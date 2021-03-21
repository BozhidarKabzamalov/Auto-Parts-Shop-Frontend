<template lang="html">
    <div class="create-category" v-if="category">
        <h1 class="column-title">Редактирай Категория</h1>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.category.name.$error }" type="text" v-model="category.name" placeholder="Име">
        </div>
        <div class="input-container">
            <input type="file" name="image" @change="setCategoryImage($event)">
        </div>
        <div class="btn btn-primary" @click="updateCategory">Редактирай</div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            categoryId: this.$route.params.categoryId,
            category: this.$route.params.category
        }
    },
    validations: {
        category: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            }
        }
    },
    methods: {
        async getCategory(){
            let response = await axios.get("/category/" + this.categoryId)

            if (response.data.category){
                this.category = response.data.category
            } else {
                router.push({ name: "404" })
            }
        },
        async updateCategory(){
            this.$v.$touch()
            if (!this.$v.$invalid) {
                try {
                    let formData = new FormData();
                    formData.append("id", this.category.id)
                    formData.append("name", this.category.name)
                    formData.append("image", this.category.image)

                    let response = await axios.post("/updateCategory", formData)

                    router.push({ name: "adminCategories" })
                } catch (e) {
                    console.log(e)
                }
            }
        },
        setCategoryImage(event){
            this.category.image = event.target.files[0]
        }
    },
    mounted(){
        if (!this.category) {
            this.getCategory()
        }
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

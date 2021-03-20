<template lang="html">
    <div class="create-category">
        <h1 class="column-title">Редактирай Категория</h1>
        {{ category }}
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
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

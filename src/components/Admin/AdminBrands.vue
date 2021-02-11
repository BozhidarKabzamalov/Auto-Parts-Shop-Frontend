<template lang="html">
    <div class="admin-brands">
        <div class="input-container">
            <input :class="{ 'validation-error': $v.brand.name.$error }" type="text" v-model="brand.name" placeholder="Име">
        </div>
        <div class="btn btn-primary" @click="createBrand">Създай</div>
        <div class="brands">
            <div class="brand" v-for="brand in brands">
                <p>{{ brand.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            brand: {
                name: ""
            },
            brands: null
        }
    },
    validations: {
        brand: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            }
        }
    },
    methods: {
        async createBrand(){
            this.$v.$touch()

            if (!this.$v.$invalid) {
                try {
                    let response = await axios.post("/createBrand", this.brand)
                } catch (e) {
                    console.log(e)
                }
            }
        },
        async getBrands(){
            try {
                let response = await axios.get("/brands")

                this.brands = response.data.brands
            } catch (e) {
                console.log(e)
            }
        }
    },
    mounted(){
        this.getBrands()
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

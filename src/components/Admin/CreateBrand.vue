<template lang="html">
    <div class="create-brand">
        <h1 class="column-title">Добави Марка</h1>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.brand.name.$error }" type="text" v-model="brand.name" placeholder="Име">
        </div>
        <div class="btn btn-primary" @click="createBrand()">Създай</div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            brand: {
                name: ""
            }
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

                    router.push({name: "adminBrands"})
                } catch (e) {
                    console.log(e)
                }
            }
        }
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

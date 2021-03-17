<template lang="html">
    <div class="update-brand">
        <h1 class="column-title">Редактирай Марка</h1>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.brand.name.$error }" type="text" v-model="brand.name" placeholder="Име">
        </div>
        <div class="btn btn-primary" @click="updateBrand()">Редактирай</div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import { required, minLength, maxLength } from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            brandId: this.$route.params.brandId,
            brand: this.$route.params.brand
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
        async updateBrand(){
            this.$v.$touch()

            if (!this.$v.$invalid) {
                try {
                    let response = await axios.post("/updateBrand", this.brand)

                    router.push({ name: "adminBrands" })
                } catch (e) {
                    console.log(e)
                }
            }
        }
    },
    mounted(){
        
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

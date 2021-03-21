<template lang="html">
    <div class="create-model" v-if="model">
        <h1 class="column-title">Редактирай Модел</h1>
        <div class="input-container">
            <input :class="{ 'validation-error': $v.model.name.$error }" type="text" v-model="model.name" placeholder="Име">
        </div>
        <div class="input-container">
            <select  v-model="model.manufacturedFrom">
                <option disabled value="">Произвеждан от</option>
                <option v-for='year in years'>{{ year }}</option>
            </select>
        </div>
        <div class="input-container">
            <select v-model="model.manufacturedTo">
                <option disabled value="">Произвеждан до</option>
                <option :value="null">Още в производство</option>
                <option v-for='year in years'>{{ year }}</option>
            </select>
        </div>
        <div class="input-container">
            <select :class="{ 'validation-error': $v.model.brandId.$error }" v-model="model.brandId">
                <option disabled value="">Марка</option>
                <option v-for='brand in brands' :value='brand.id'>{{ brand.name }}</option>
            </select>
        </div>
        <div class="btn btn-primary" @click="updateModel">Редактирай</div>
    </div>
</template>

<script>
import axios from "axios"
import router from '../../router'
import { required, minLength, maxLength, integer, minValue } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            modelId: this.$route.params.modelId,
            model: this.$route.params.model,
            brands: "",
            models: null
        }
    },
    validations: {
        model: {
            name: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            brandId: {
                required,
                integer,
                minValue: minValue(0)
            }
        }
    },
    methods: {
        async getModel(){
            let response = await axios.get("/model/" + this.modelId)

            if (response.data.model){
                this.model = response.data.model
            } else {
                router.push({ name: "404" })
            }
        },
        async updateModel(){
            this.$v.$touch()

            if (!this.$v.$invalid) {
                try {
                    let response = await axios.post("/updateModel", this.model)

                    router.push({ name: "adminModels" })
                } catch (e) {
                    console.log(e)
                }
            }
        },
        async getBrands(){
            try {
                let response = await axios.get('/brands')

                this.brands = response.data.brands
            } catch (e) {
                console.log(e)
            }
        }
    },
    computed: {
        years(){
            let yearsArray = [];
            let startYear = 1950
            let currentYear = new Date().getFullYear()

            while ( startYear <= currentYear ) {
                yearsArray.unshift(startYear++);
            }

            return yearsArray;
        }
    },
    mounted(){
        if (!this.model) {
            this.getModel()
        }
        this.getBrands()
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

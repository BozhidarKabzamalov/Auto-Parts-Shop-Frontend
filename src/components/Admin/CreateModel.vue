<template lang="html">
    <div class="create-model">
        <h1 class="column-title">Добави Модел</h1>
        <div class="input-container">
            <input type="text" v-model="model.name" placeholder="Име">
        </div>
        <div class="input-container">
            <select v-model="model.manufacturedFrom">
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
            <select v-model="model.brandId">
                <option disabled value="">Марка</option>
                <option v-for='brand in brands' :value='brand.id'>{{ brand.name }}</option>
            </select>
        </div>
        <div class="btn btn-primary" @click="createModel">Създай</div>
    </div>
</template>

<script>
import axios from "axios"
import router from '../../router'

export default {
    data(){
        return {
            model: {
                name: "",
                manufacturedFrom: "",
                manufacturedTo: "",
                brandId: ""
            },
            brands: "",
            models: null
        }
    },
    methods: {
        async createModel(){
            let response = await axios.post("/createModel", this.model)

            router.push({ name: "adminModels" })
        },
        async getBrands(){
            let response = await axios.get('/brands')

            this.brands = response.data.brands
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
        this.getBrands()
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

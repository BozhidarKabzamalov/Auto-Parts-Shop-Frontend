<template lang="html">
    <div class="admin-models">
        <div class="column-title">
            <p>Модели</p>
            <div class="create-order"></div>
        </div>
        <div class="models">
            <div class="model" v-for="model in models">
                <p>{{ model.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"

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
        },
        async getBrands(){
            let response = await axios.get('/brands')

            this.brands = response.data.brands
        },
        async getModels(){
            let response = await axios.get('/models')

            this.models = response.data.models
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
        this.getModels()
    }
}
</script>

<style lang="css" scoped>
.btn {
    width: 250px;
}
</style>

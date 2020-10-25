<template lang="html">
    <div class="select-by-brand">
        <select v-model="selectedBrand">
            <option disabled value="">Марка</option>
            <option v-for='brand in brands'>{{ brand.name }}</option>
        </select>
        <select v-model="selectedYear">
            <option disabled value="">Година</option>
            <option v-for='year in years'>{{ year }}</option>
        </select>
        <select v-model="selectedModel">
            <option disabled value="">Модел</option>
            <option v-for='model in models'>{{ model.name }}</option>
        </select>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            brands: null,
            selectedBrand: '',
            selectedYear: '',
            models: null,
            selectedModel: '',
        }
    },
    methods: {
        async getBrands(){
            let response = await axios.get('http://localhost:3000/brands')

            this.brands = response.data.brands
        },
        async getModels(){
            let response = await axios.get('http://localhost:3000/models?brandId=1&year=2010')

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
    watch: {
        selectedBrand: function(){
            this.getModels()
        }
    },
    mounted(){
        this.getBrands()
    }
}
</script>

<style lang="css" scoped>

</style>

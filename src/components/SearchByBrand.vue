<template lang="html">
    <div class="search-by-brand">
        <div class="test">
            <select v-model="selectedBrand">
                <option disabled value="">Марка</option>
                <option v-for='brand in brands' :value='brand'>{{ brand.name }}</option>
            </select>
            <select v-model="selectedYear">
                <option disabled value="">Година</option>
                <option v-for='year in years'>{{ year }}</option>
            </select>
            <select v-model="selectedModel">
                <option disabled value="">Модел</option>
                <option v-for='model in models' :value='model'>{{ model.name }}</option>
            </select>
            <div class="search" @click='search()'>Click me</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

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
            let response = await axios.get('http://localhost:3000/models/' + this.selectedBrand.id + '/' + this.selectedYear)

            this.models = response.data.models
        },
        search(){
            router.push({ name: 'categories', query: { brand: this.selectedBrand.name, model: this.selectedModel.name } })
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
        selectedBrandId: function(){
            if (this.selectedBrandId != '' && this.selectedYear != '') {
                this.getModels()
            }
        },
        selectedYear: function(){
            if (this.selectedBrandId != '' && this.selectedYear != '') {
                this.getModels()
            }
        }
    },
    mounted(){
        this.getBrands()
    }
}
</script>

<style lang="css" scoped>
.search-by-brand {
    padding-top: 20px;
    width: 500px;
}
.test {
    display: flex;
    flex-direction: column;
}
.test select {
    margin-bottom: 20px;
}
</style>

<template lang="html">
    <div class="search-by-brand">
        <h1 class="column-title">Търсене по автомобил</h1>
        <div class="search-body">
            <div class="brand-year">
                <select class='brand' v-model="selectedBrand">
                    <option disabled value="">Марка</option>
                    <option v-for='brand in brands' :value='brand'>{{ brand.name }}</option>
                </select>
                <select class='year' v-model="selectedYear">
                    <option disabled value="">Година</option>
                    <option v-for='year in years'>{{ year }}</option>
                </select>
            </div>
            <select v-model="selectedModel">
                <option disabled value="">Модел</option>
                <option v-for='model in models' :value='model'>{{ model.name }}</option>
            </select>
            <div class="search" @click='search()'>Търси</div>
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
            let response = await axios.get('/brands')

            this.brands = response.data.brands
        },
        async getModels(){
            let response = await axios.get('/models/' + this.selectedBrand.id + '/' + this.selectedYear)

            this.models = response.data.models
        },
        search(){
            if (this.selectedBrand && this.selectedModel) {
                router.push({ name: 'categories', query: { brand: this.selectedBrand.name, model: this.selectedModel.name } })
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
    watch: {
        selectedBrand: function(){
            if (this.selectedYear != '') {
                this.getModels()
            }
        },
        selectedYear: function(){
            if (this.selectedBrand != '') {
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
    width: 250px;
}
.search-body {
    display: flex;
    flex-direction: column;
}
.search-body select {
    margin-bottom: 20px;
    padding: 4px;
    min-width: 88px;
    border: 1px solid #ddd;
    cursor: pointer;
    height: 38px;
    background-color: #ffffff;
    outline: none;
}
.search-body select:hover {
    border: 1px solid #aaa;
}
.brand-year {
    display: flex;
}
.brand {
    flex: 2;
    margin-right: 10px;
}
.year {
    flex: 1
}
.search {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #ffffff;
    padding: 10px 0;
    background-color: #46b05a;
    cursor: pointer;
}
.search:hover {
    background-color: #3da34d;
}

@media (max-width: 500px) {
    .search-by-brand {
        width: 100%;
    }
    .search-body {
        width: 100%;
    }
}
</style>

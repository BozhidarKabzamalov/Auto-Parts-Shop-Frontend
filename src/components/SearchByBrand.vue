<template lang="html">
    <div class="search-by-brand">
        <h1 class="column-title">Търсене по автомобил</h1>
        <div class="search-body">
            <div class="brand-year">
                <select :class="{ 'validation-error': $v.selectedBrand.$error }" class='brand' v-model="selectedBrand">
                    <option disabled value="">Марка</option>
                    <option v-for='brand in brands' :value='brand'>{{ brand.name }}</option>
                </select>
                <select :class="{ 'validation-error': $v.selectedYear.$error }" class='year' v-model="selectedYear">
                    <option disabled value="">Година</option>
                    <option v-for='year in years'>{{ year }}</option>
                </select>
            </div>
            <select :class="{ 'validation-error': $v.selectedModel.$error }" v-model="selectedModel">
                <option disabled value="">Модел</option>
                <option v-for='model in models' :value='model'>{{ model.name }}</option>
            </select>
            <div class="btn btn-primary" @click='search()'>Търси</div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'
import { required, minLength, maxLength, minValue, maxValue, integer } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            brands: null,
            models: null,
            selectedBrand: '',
            selectedYear: '',
            selectedModel: ''
        }
    },
    validations: {
        selectedBrand: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(255)
        },
        selectedModel: {
            required,
            minLength: minLength(1),
            maxLength: maxLength(255)
        },
        selectedYear: {
            required,
            minValue: minValue(1),
            maxValue: maxValue(9999),
            integer
        }
    },
    methods: {
        async getBrands(){
            try {
                let response = await axios.get('/brands')

                this.brands = response.data.brands
            } catch (e) {
                console.log(e)
            }
        },
        async getModels(){
            try {
                let response = await axios.get('/models?brandId=' + this.selectedBrand.id + '&year=' + this.selectedYear)

                this.models = response.data.models
            } catch (e) {
                console.log(e)
            }
        },
        search(){
            this.$v.$touch()

            if (!this.$v.$invalid) {
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
    margin-bottom: 20px;
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

@media (max-width: 500px) {
    .search-by-brand {
        width: 100%;
    }
    .search-body {
        width: 100%;
    }
}
</style>

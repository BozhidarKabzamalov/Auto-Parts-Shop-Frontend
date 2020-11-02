<template lang="html">
    <div class="home">
        <div class="column">
            <SearchByBrand></SearchByBrand>
        </div>
        <div class="column">
            <div class="parts-container">
                <Part v-for='part in parts' :part='part'></Part>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import SearchByBrand from '../components/SearchByBrand'
import Part from '../components/Part'

export default {
    components: {
        Part,
        SearchByBrand
    },
    data(){
        return {
            currentPage: 1,
            parts: null,
            totalItems: null,
            totalPages: null,
        }
    },
    methods: {
        async getParts(){
            let response = await axios.get('http://localhost:3000/parts?page=' + this.currentPage)
            console.log(response)
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
            this.parts = response.data.parts
        }
    },
    mounted(){
        this.getParts()
    }
}
</script>

<style lang="css" scoped>
.home {
    display: flex;
    padding-top: 20px;
}
.column:last-child {
    flex: 1;
    margin-left: 10px;
}
.parts-container {
    padding: 20px;
    background-color: #ffffff;
    border: 1px solid #dee2e6;
}
</style>

<template lang="html">
    <div class="admin-models">
        <div class="column-title">
            <p>Модели</p>
            <div class="create-button" @click="goToCreateModel()">Добави</div>
        </div>
        <div class="models">
            <div class="model" v-for="model in models">
                <p>{{ model.name }}</p>
            </div>
        </div>
        <Pagination :currentPage="currentPage" :totalPages="totalPages" @setCurrentPage="setCurrentPage"></Pagination>
    </div>
</template>

<script>
import axios from "axios"
import router from "../../router"
import Pagination from "../Pagination"

export default {
    components: {
        Pagination
    },
    data(){
        return {
            models: null,
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getModels(){
            let response = await axios.get('/models?page=' + this.currentPage)

            this.models = response.data.models
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
        },
        setCurrentPage(page){
            this.currentPage = page
        },
        goToCreateModel(){
            router.push({ name: "createModel" })
        }
    },
    mounted(){
        this.getModels()
    }
}
</script>

<style lang="css" scoped>
.column-title {
    margin-bottom: 0px;
}
.model {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dddddd;
    padding: 20px 0;
    font-size: 15px;
}
</style>

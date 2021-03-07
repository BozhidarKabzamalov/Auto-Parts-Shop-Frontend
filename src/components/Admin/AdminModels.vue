<template lang="html">
    <div class="admin-models">
        <div class="column-title">
            <p>Модели</p>
            <div class="create-button" @click="goToCreateModel()">Добави</div>
        </div>
        <div class="models">
            <div class="model" v-for="model in models">
                <p>{{ model.name }}</p>
                <div class="btn btn-danger" @click="deleteModel(model)">Delete</div>
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
            models: [],
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getModels(){
            try {
                let response = await axios.get('/models?page=' + this.currentPage)

                this.models = response.data.models
                this.totalItems = response.data.totalItems
                this.totalPages = response.data.totalPages
            } catch (e) {
                console.log(e)
            }
        },
        async deleteModel(model){
            try {
                let response = await axios.post('/deleteModel', { modelId: model.id })

                let index = this.models.indexOf(model)
                this.models.splice(index, 1)
            } catch (e) {
                console.log(e)
            }
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
.btn {
    margin-left: auto;
    width: 100px;
}
</style>

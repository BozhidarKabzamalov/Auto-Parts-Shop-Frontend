<template lang="html">
    <div class="category">
        <div class="parts">
            <Part v-for='part in parts' :part='part'></Part>
        </div>
        <div v-for='page in totalPages' @click='currentPage = page'>{{ page }}</div>
    </div>
</template>

<script>
import axios from 'axios'
import Part from '../components/Part.vue'

export default {
    components: {
        Part
    },
    data(){
        return {
            model: this.$route.query.model,
            categoryId: this.$route.query.categoryId,
            currentPage: 1,
            parts: null,
            partsTest: null,
            totalItems: null,
            totalPages: null,
        }
    },
    methods: {
        async getPartsByCategory(){
            let response = await axios.get('http://localhost:3000/parts/' + this.categoryId + '?page=' + this.currentPage)
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
            this.parts = response.data.parts
        },
        async getPartsByModelAndCategory(){
            let response = await axios.get('http://localhost:3000/parts/' + this.model + '/' + this.categoryId + '?page=' + this.currentPage)
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
            this.parts = response.data.parts
        }
    },
    watch: {
        currentPage: function(){
            if (this.model === undefined) {
                this.getPartsByCategory()
            } else {
                this.getPartsByModelAndCategory()
            }
        }
    },
    mounted(){
        if (this.model === undefined) {
            this.getPartsByCategory()
        } else {
            this.getPartsByModelAndCategory()
        }
    }
}
</script>

<style lang="css" scoped>
.category {
    padding-top: 10px;
}
.part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dee2e6;
}
.part-image-container {
    width: 100px;
    height: auto;
}
.part-image {
    display: block;
}
</style>

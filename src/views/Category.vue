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
            categoryId: this.$route.params.categoryId,
            currentPage: 1,
            parts: null,
            totalItems: null,
            totalPages: null,
        }
    },
    methods: {
        async getCategoryItems(){
            let response = await axios.get('http://localhost:3000/parts/' + this.categoryId + '?page=' + this.currentPage)
            this.totalItems = response.data.totalItems
            this.totalPages = response.data.totalPages
            this.parts = response.data.parts
        }
    },
    watch: {
        currentPage: function(){
            this.getCategoryItems()
        }
    },
    mounted(){
        this.getCategoryItems()
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

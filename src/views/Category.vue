<template lang="html">
    <div class="">
        test
    </div>
</template>

<script>
import axios from 'axios'

export default {
    methods: {
        async getCategoryItems(categoryId){
            let response = await axios.get('http://localhost:3000/category/' + categoryId)
            console.log(response)
        }
    },
    mounted(){
        this.getCategoryItems(1)
    }
}
</script>

<style lang="css" scoped>
</style>

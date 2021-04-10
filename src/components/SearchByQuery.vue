<template lang="html">
    <form class='search-by-query' v-on:submit.prevent="search">
        <input class='search-bar' v-model="searchQuery" type="text" placeholder="Търси по име или сериен №" autocomplete="off" spellcheck="false">
        <div class="search-icon-container" v-on:click='search'><i class="fas fa-search"></i></div>
    </form>
</template>

<script>
import router from "../router"

export default {
    data(){
        return {
            searchQuery: ""
        }
    },
    methods: {
        search(){
            router.replace({ name: "home", query: { searchQuery: this.searchQuery }})
            this.searchQuery = ""
        }
    }
}
</script>

<style lang="css" scoped>
.search-by-query {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 30px;
    width: 240px;
}
.search-bar {
    height: 35px;
    width: 100%;
    border: 1px solid #ffffff;
    padding: 15px;
    background-color: #ffffff;
    color: #606060;
    outline: none;
}
::placeholder {
    color: #757575;
    opacity: 1;
}
.search-icon-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    background-color: #ffffff;
    cursor: pointer;
}
</style>

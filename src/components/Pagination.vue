<template lang="html">
    <div class="pagination">
        <div v-for="page in totalPages">
            <div class="page" :class="{ active: page == currentPage}"  @click="setCurrentPage(page)">{{ page }}</div>
        </div>
    </div>
</template>

<script>
export default {
    props: ["totalPages", "currentPage"],
    methods: {
        setCurrentPage(page){
            this.$emit("setCurrentPage", page);
        }
    }
}
</script>

<style lang="css" scoped>
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
}
.page {
    padding: 10px;
    border: 1px solid #ddd;
    margin-right: 10px;
    cursor: pointer;
}
.page:hover {
    border: 1px solid #aaa;
}
.active {
    border: 1px solid #aaa;
}
</style>

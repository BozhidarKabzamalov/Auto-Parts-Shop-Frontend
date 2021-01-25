<template lang="html">
    <div class="pagination">
        <div v-for="page in pages">
            <div class="page" :class="{ active: page == currentPage}" @click="setCurrentPage(page)">{{ page }}</div>
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
    },
    computed: {
        pages() {
            const numShown = Math.min(5, this.totalPages);
            let first = this.currentPage - Math.floor(numShown / 2);
            first = Math.max(first, 1);
            first = Math.min(first, this.totalPages - numShown + 1);
            return [...Array(numShown)].map((k,i) => i + first);
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
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    padding: 10px;
    border: 1px solid #ddd;
    margin-right: 10px;
    cursor: pointer;
    user-select: none;
}
.page:hover {
    border: 1px solid #aaa;
}
.active {
    border: 1px solid #aaa;
}
</style>

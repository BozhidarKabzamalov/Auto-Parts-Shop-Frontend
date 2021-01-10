<template lang="html">
    <ul class="admin-header">
        <router-link :to="{ name: 'adminOrders' }" tag='li'>Поръчки</router-link>
        <router-link :to="{ name: 'adminProducts' }" tag='li'>Продукти</router-link>
        <router-link :to="{ name: 'adminCategories' }" tag='li'>Категории</router-link>
        <router-link :to="{ name: 'adminBrands' }" tag='li'>Марки</router-link>
        <router-link :to="{ name: 'adminModels' }" tag='li'>Модели</router-link>
    </ul>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.admin-header {
    display: flex;
    background-color: #f7f7f7;
}
.admin-header li {
    font-size: 15px;
    cursor: pointer;
    font-weight: 500;
    margin-right: 20px;
    padding: 20px;
}
.ademin-header li:hover {
    background-color: #d6e0ec;
}
</style>

<template lang="html">
    <div class="admin-header">
        <div class="wrapper">
            <ul class="admin-ul">
                <router-link :to="{ name: 'adminOrders' }" tag='li'>Поръчки</router-link>
                <router-link :to="{ name: 'adminProducts' }" tag='li'>Продукти</router-link>
                <router-link :to="{ name: 'adminCategories' }" tag='li'>Категории</router-link>
                <router-link :to="{ name: 'adminBrands' }" tag='li'>Марки</router-link>
                <router-link :to="{ name: 'adminModels' }" tag='li'>Модели</router-link>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
.admin-header {
    background-color: #f7f7f7;
    border-bottom: 1px solid #dddddd;
}
.admin-ul {
    display: flex;
    flex-wrap: wrap;
}
.admin-ul li {
    font-size: 15px;
    cursor: pointer;
    font-weight: 500;
    padding: 16px 30px 16px 0;
}
.admin-ul li:last-child {
    margin-right: 0px;
}
.ademin-ul li:hover {
    background-color: #d6e0ec;
}
</style>

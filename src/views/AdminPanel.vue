<template lang="html">
    <div class="admin-panel">
        <div class="row">
            <div class="column">
                <h1 class="column-title">Навигация</h1>
                <ul class='admin-panel-navigation'>
                    <router-link to="" tag='li'>Поръчки</router-link>
                    <router-link to="" tag='li'>Продукти</router-link>
                    <router-link to="" tag='li'>Категории</router-link>
                </ul>
            </div>
            <div class="column">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<style lang="css" scoped>
.row {
    display: flex;
}
.column:first-child {
    flex-shrink: 0;
    width: 250px;
    margin-right: 15px;
}
.column:last-child {
    flex: 1;
    margin-left: 15px;
}
.admin-panel-navigation {
    background-color: #ffffff;
}
.admin-panel-navigation li {
    padding: 10px 20px 10px 20px;
}
</style>

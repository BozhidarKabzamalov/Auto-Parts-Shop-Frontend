<template>
    <div class="header">
        <div class='wrapper'>
            <ul class='nav-ul'>
                <router-link to="/" tag='li'>Начало</router-link>
                <router-link to="/categories" tag='li'>Категории</router-link>
                <!--<router-link to="/cart" tag='li'>Контакти</router-link>
                <router-link to="/cart" tag='li'>За нас</router-link>
                <router-link to="/cart" tag='li'>Доставка</router-link>
                <router-link to="/cart" tag='li'>Общи условия</router-link>
                <router-link to="/cart" tag='li'>Поверителност</router-link>-->
                <router-link to="/cart" tag='li'>Количка ({{ cartItemsCount }})</router-link>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        computed: {
            cartItemsCount(){
                return this.$store.getters.cartItemCount
            }
        }
    }
</script>

<style scoped>
    .header {
        background-color: #23282b;
    }
    .nav-ul {
        display: flex;
    }
    .nav-ul li {
        padding: 16px 30px 16px 0;
        color: #ffffff;
        cursor: pointer;
    }
</style>

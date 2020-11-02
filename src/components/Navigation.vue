<template>
    <div class="nav">
        <div class='wrapper'>
            <ul class='nav-ul'>
                <router-link to="/" tag='li'>Начало</router-link>
                <router-link to="/categories" tag='li'>Категории</router-link>
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
    .nav {
        background-color: #252934;
    }
    .nav-ul {
        display: flex;
    }
    .nav li {
        padding: 16px 30px 16px 0;
        color: #ffffff;
        cursor: pointer;
    }
</style>

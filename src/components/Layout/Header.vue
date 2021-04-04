<template>
    <div class="header">
        <div class='wrapper'>
            <ul class='nav-ul'>
                <router-link to="/" tag='li'>Начало</router-link>
                <router-link to="/categories" tag='li'>Категории</router-link>
                <router-link v-if="authenticated" to="/admin" tag='li'>Admin</router-link>
                <SearchByQuery></SearchByQuery>
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
import SearchByQuery from "../SearchByQuery"

export default {
    components: {
        SearchByQuery
    },
    computed: {
        cartItemsCount(){
            return this.$store.getters.cartItemCount
        },
        authenticated(){
            return this.$store.getters.authenticated
        }
    }
}
</script>

<style scoped>
    .header {
        background-color: #24292e;
    }
    .nav-ul {
        display: flex;
        flex-wrap: wrap;
    }
    .nav-ul li {
        padding: 21px 30px 21px 0;
        color: #ffffff;
        cursor: pointer;
        font-weight: 500;
        font-size: 15px;
    }
    .nav-ul li:last-child {
        margin-left: auto;
    }

    @media (max-width: 1000px) {
        .nav-ul {
            flex-direction: column;
        }
    }
</style>

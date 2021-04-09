<template>
    <div class="header">
        <div class='wrapper'>
            <div class='navigation'>
                <div class="hamburger-menu" @click="hamburgerToggle = !hamburgerToggle"><i class="fas fa-bars"></i></div>
                <div class="navigation-elements">
                    <router-link to="/" tag='div'>Начало</router-link>
                    <router-link to="/categories" tag='div'>Категории</router-link>
                    <router-link v-if="authenticated" to="/admin" tag='div'>Admin</router-link>
                    <SearchByQuery></SearchByQuery>
                    <router-link to="/cart" tag='div'>Количка ({{ cartItemsCount }})</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SearchByQuery from "../SearchByQuery"

export default {
    components: {
        SearchByQuery
    },
    data(){
        return {
            hamburgerToggle: false
        }
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
        background-color: #c23131;
        background: linear-gradient(-45deg, #57cfb0, #2ab5d3);
    }
    .navigation {
        display: flex;
        flex-wrap: wrap;
    }
    .navigation-elements {
        display: flex;
        flex-wrap: wrap;
    }
    .navigation-elements div {
        padding: 21px 30px 21px 0;
        color: #ffffff;
        cursor: pointer;
        font-weight: 700;
        font-size: 15px;
    }
    .navigation-elements div:last-child {
        margin-left: auto;
    }
    .hamburger-menu {
        padding: 18px 30px 18px 0;
        color: #ffffff;
        cursor: pointer;
        font-size: 20px;
        display: none;
    }

    @media (max-width: 1000px) {
        .hamburger-menu {
            display: block;
        }
        .navigation {
            flex-direction: column;
        }
        .navigation-elements div{
            display: none;
        }
        .search-by-query {
            justify-content: flex-start;
            display: none;
        }
        .navigation-elements div:last-child {
            margin-left: 0;
        }
    }
</style>

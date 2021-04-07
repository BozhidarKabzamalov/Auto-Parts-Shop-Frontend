<template>
    <div class="footer">
        <div class='wrapper'>
            <ul class='nav-ul'>
                <!--<router-link to="/cart" tag='li'>Контакти</router-link>-->
                <router-link to="/about" tag='li'>За нас</router-link>
                <router-link to="/delivery" tag='li'>Доставка</router-link>
                <router-link to="/tos" tag='li'>Общи условия</router-link>
                <!--<router-link to="/cart" tag='li'>Поверителност</router-link>-->
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .footer {
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
</style>

<template lang="html">
    <div class="delivery-products">

        <div class="row" v-if='cartItemsCount == 0'>
            <p>Вашата количка е празна.</p>
        </div>

        <div class="row" v-else>

            <div class='column'>
                <p class="column-title">Моята количка</p>
                <Product v-for='product in cart' :product='product'></Product>
            </div>

            <div class='column'>
                <p class="column-title">Поръчка</p>
                <div class="cart-info">
                    <p>Продукти</p>
                    <p>{{ cartItemsCount }}</p>
                </div>
                <div class="cart-info">
                    <p>Крайна цена</p>
                    <p>{{ cartTotalPrice }} лв</p>
                </div>
                <div class="next-step" @click='setSelectedStep(2)'>Напред</div>
            </div>

        </div>
    </div>
</template>

<script>
import Product from '../components/Product.vue'

export default {
    components: {
        Product,
    },
    methods: {
        setSelectedStep(stepNumber){
            this.$emit('setSelectedStep', stepNumber);
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart.cart
        },
        cartItemsCount(){
            return this.$store.getters.cartItemCount
        },
        cartTotalPrice(){
            return this.$store.getters.cartTotalPrice
        }
    }
}
</script>

<style lang="css" scoped>
.row {
    display: flex;
}
.column:first-child {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-right: 15px;
}
.column:last-child {
    flex-basis: 300px;
    margin-left: 15px;
}
.cart-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
}
.column-title {
    margin-bottom: 20px;
}
.next-step {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: #46b05a;
    height: 60px;
    cursor: pointer;
}
.next-step:hover {
    background-color: #3da34d;
}
</style>

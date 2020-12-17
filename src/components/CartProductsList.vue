<template lang="html">
    <div class="delivery-products">

        <div class="row" v-if='cartItemsCount == 0'>
            <p>Вашата количка е празна.</p>
        </div>

        <div class="row" v-else>

            <div class='column'>
                <h1 class="column-title cart-products-title">Моята количка</h1>
                <div class="product-information">
                    <p class="product-image"></p>
                    <p class="product-name">Име</p>
                    <p class="product-manufacturer">Производител</p>
                    <p class="product-quantity">Quantity</p>
                    <p class="product-price">Цена</p>
                </div>
                <CartProduct v-for="product in cart" :product="product"></CartProduct>
            </div>

            <div class='column'>
                <h1 class="column-title">Поръчка</h1>
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
import CartProduct from './CartProduct'

export default {
    components: {
        CartProduct
    },
    methods: {
        setSelectedStep(stepNumber){
            this.$emit('setSelectedStep', stepNumber)
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
    width: 250px;
    margin-left: 15px;
}
.cart-info {
    display: flex;
    justify-content: space-between;
    margin: 20px 0;
}
.next-step {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: #46b05a;
    height: 60px;
    cursor: pointer;
    margin-bottom: 20px;
}
.next-step:hover {
    background-color: #3da34d;
}
.product-information {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding-bottom: 20px;
    border-bottom: 1px solid #dddddd;
}
.product-image {
    height: 1px;
    width: 100px;
    margin-right: 10px;
}
.product-name {
    width: 200px;
    margin-right: 10px;
}
.product-manufacturer {
    width: 120px;
    margin-right: 10px;
}
.product-quantity {
    width: 144px;
    margin-right: 10px;
}
.product-price {
    width: 80px;
}

@media (max-width: 1450px) {
    .row {
        flex-direction: column;
    }
    .column:first-child {
        margin-right: 0;
    }
    .column:last-child {
        margin-left: 0;
    }
}

@media (max-width: 1080px) {
    .product-manufacturer {
        display: none;
    }
}

@media (max-width: 860px) {
    .product-information {
        display: none;
    }
    .cart-products-title {
        margin-bottom: 0;
    }
    .column:last-child {
        width: 100%;
    }
}
</style>

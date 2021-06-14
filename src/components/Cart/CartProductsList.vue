<template lang="html">
    <div class="delivery-products">

        <div class="row">

            <div class='column'>
                <h1 class="column-title cart-products-title">Моята количка</h1>
                <p v-if='cartItemsCount == 0'>Вашата количка е празна.</p>
                <div v-else>
                    <div class="product-information">
                        <p class="product-image"></p>
                        <p class="product-name">Име</p>
                        <p class="product-manufacturer">Производител</p>
                        <p class="product-quantity">Quantity</p>
                        <p class="product-price">Цена</p>
                    </div>
                    <CartProduct v-for="product in cart" :product="product"></CartProduct>
                </div>
            </div>

            <div class='column' v-if='cartItemsCount !== 0'>
                <h1 class="column-title">Поръчка</h1>
                <div class="cart-info">
                    <p>Продукти</p>
                    <p>{{ cartItemsCount }}</p>
                </div>
                <div class="cart-info">
                    <p>Крайна цена</p>
                    <p>{{ cartTotalPrice }} лв</p>
                </div>
                <div class="btn btn-primary" @click='goToDeliveryInformation()'>Напред</div>
            </div>

        </div>
    </div>
</template>

<script>
import CartProduct from './CartProduct'
import router from '../../router'

export default {
    components: {
        CartProduct
    },
    methods: {
        goToDeliveryInformation(){
            router.push({ name: 'deliveryInformation' })
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
            return (this.$store.getters.cartTotalPrice).toFixed(2)
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
    width: 120px;
}
.btn {
    height: 60px;
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
    .column:last-child {
        width: 100%;
    }
}
</style>

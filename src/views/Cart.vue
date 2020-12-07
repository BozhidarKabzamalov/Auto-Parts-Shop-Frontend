<template lang="html">
    <div class="cart">

        <p v-if='cartItemsCount == 0'>Вашата количка е празна.</p>

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
                <div class="continue-container">
                    <div class="continue" @click='submitOrder'>Напред</div>
                </div>
            </div>

        </div>

    </div>
</template>

<script>
import axios from 'axios'
import Product from '../components/Product.vue'

export default {
    components: {
        Product
    },
    data(){
        return {
            name: 'Bozhidar Kabzamalov',
            phone: '0877700349'
        }
    },
    methods: {
        async submitOrder(){
            let order = {
                name: this.name,
                phone: this.phone,
                items: this.cart
            }

            let response = await axios.post('http://localhost:3000/order', order)

            console.log(response)
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
.continue-container {
    padding-bottom: 30px;
    border-bottom: 1px solid #9a9a9a;
}
.continue {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    background-color: #46b05a;
    width: 100%;
    height: 60px;
    cursor: pointer;
}
.continue:hover {
    background-color: #3da34d;
}

@media (max-width: 500px) {
    .row {
        flex-direction: column;
    }
    .column:first-child {
        margin-right: 0px;
    }
    .column:last-child {
        margin-left: 0px;
    }
}

</style>

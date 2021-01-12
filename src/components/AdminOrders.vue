<template lang="html">
    <div class="admin-orders">
        <div class="order-information">
            <p class="order-id">№</p>
            <p class="order-name">Име</p>
            <p class="order-phone-number">Телефон</p>
            <p class="order-total-price">Цена</p>
        </div>
        <div class="order" v-for="order in orders" @click="goToOrder(order)">
            <div class="order-id">
                <p>{{ order.id }}</p>
            </div>
            <div class="order-name">
                <p>{{ order.firstName }} {{ order.lastName }}</p>
            </div>
            <div class="order-phone-number">
                <p>{{ order.phoneNumber }}</p>
            </div>
            <div class="order-total-price">
                <p>{{ order.totalPrice }} лв</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../router'

export default {
    data(){
        return {
            orders: null
        }
    },
    methods: {
        async getOrders(){
            let response = await axios.get('/orders')

            this.orders = response.data.orders
        },
        goToOrder(order){
            router.push({ name: "adminOrder", params: { orderId: order.id, order: order }})
        }
    },
    mounted(){
        this.getOrders()
    }
}
</script>

<style lang="css" scoped>
.order-information {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px;
    border-bottom: 1px solid #dddddd;
}
.order {
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #ffffff;
    cursor: pointer;
    border-bottom: 1px solid #dddddd;
}
.order:hover {
    background-color: #f7f7f7;
}
.order-id, .order-total-price {
    width: 100px;
}
.order-name, .order-phone-number {
    width: 200px;
}
</style>

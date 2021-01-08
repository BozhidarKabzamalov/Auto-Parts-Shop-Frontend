<template lang="html">
    <div class="admin-orders">
        <h1 class="column-title">Поръчки</h1>
        <div class="order" v-for="order in orders">
            <div>
                <p>№</p>
                <p>{{ order.id }}</p>
            </div>
            <div>
                <p>Име</p>
                <p>{{ order.firstName }} {{ order.lastName }}</p>
            </div>
            <div>
                <p>Телефон</p>
                <p>{{ order.phoneNumber }}</p>
            </div>
            <div>
                <p>Цена</p>
                <p>{{ order.totalPrice }}</p>
            </div>
            <div>
                <div class="order-details">Подробности</div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data(){
        return {
            orders: null
        }
    },
    methods: {
        async getOrders(){
            let response = await axios.get('http://localhost:3000/orders')
            console.log(response)
            this.orders = response.data.orders
        }
    },
    mounted(){
        this.getOrders()
    }
}
</script>

<style lang="css" scoped>
.order {
    padding: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    background-color: #ffffff;
}
.order p {
    margin-bottom: 5px;
}
.order-details {
    font-size: 14px;
    padding: 10px;
    color: #ffffff;
    background-color: #46b05a;
    cursor: pointer;
}
.order-details:hover {
    background-color: #3da34d;
}
</style>

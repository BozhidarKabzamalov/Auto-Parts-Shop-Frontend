<template lang="html">
    <div class="admin-orders">
        <h1 class="column-title">Поръчки</h1>
        <div v-if="orders.length">
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
            <Pagination :currentPage="currentPage" :totalPages="totalPages" @setCurrentPage="setCurrentPage"></Pagination>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import Pagination from '../Pagination'

export default {
    components: {
        Pagination
    },
    data(){
        return {
            orders: [],
            currentPage: 1,
            totalItems: null,
            totalPages: null
        }
    },
    methods: {
        async getOrders(){
            try {
                let response = await axios.get('/orders?page=' + this.currentPage)

                this.orders = response.data.orders
                this.totalItems = response.data.totalItems
                this.totalPages = response.data.totalPages
            } catch (e) {
                console.log(e)
            }
        },
        setCurrentPage(page){
            this.currentPage = page
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
.column-title {
    margin-bottom: 0;
}
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

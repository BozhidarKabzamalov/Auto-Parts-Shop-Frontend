<template lang="html">
    <div class="admin-order">
        <div>
            <p>Номер на поръчка</p>
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
            <p>Имeйл</p>
            <p>{{ order.email }}</p>
        </div>
        <div>
            <p>Град</p>
            <p>{{ order.city }}</p>
        </div>
        <div>
            <p>Пощенски код</p>
            <p>{{ order.zipCode }}</p>
        </div>
        <div>
            <p>Адрес</p>
            <p>{{ order.streetAddress }}</p>
        </div>
        <div>
            <p>Допълнителна информация</p>
            <p>{{ order.extraNotes }}</p>
        </div>
        <div>
            <p>Крайна цена</p>
            <p>{{ order.totalPrice }} лв</p>
        </div>
        <div>
            <p>Дата</p>
            <p>{{ timestampToDate(order.createdAt) }}</p>
        </div>
        <div>
            <p>Продукти</p>
            <div class="products">
                <div class="product" v-for="product in order.products" @click="goToProductPage(product)">
                    <p>Количество: {{ product.Order_Product.quantity}}</p>
                    <p>Име: {{ product.name }}</p>
                    <p>Сериен №: {{ product.serialNumber }}</p>
                    <p>Цена: {{ product.price }} лв</p>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import moment from "moment"
import router from "../../router"

export default {
    data(){
        return {
            orderId: this.$route.params.orderId,
            order: this.$route.params.order
        }
    },
    methods: {
        goToProductPage(product){
            router.push({ name: "specificProduct", params: { productName: product.name, productId: product.id }})
        },
        timestampToDate(timestamp){
            return moment(timestamp).format('L');
        }
    }
}
</script>

<style lang="css" scoped>
.admin-order > div {
    padding: 15px;
    border-bottom: 1px solid #dddddd;
}
.admin-order > div > p:first-child {
    font-weight: 500;
    margin-bottom: 5px;
}
.product {
    margin-bottom: 20px;
}
</style>

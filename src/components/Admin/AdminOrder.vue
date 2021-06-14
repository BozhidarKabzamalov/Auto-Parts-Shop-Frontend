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
                    <div class="product-price">
                        <div class="product-price-discount">
                            <p class="price" :class="{ discounted: discounted(product) }">{{ product.price }} лв</p>
                            <p class="discount" v-if="discounted(product)">-{{ product.discount }}%</p>
                        </div>
                        <p class="discounted-price" v-if="discounted(product)">{{ discountPrice(product) }} лв</p>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from "axios"
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
        async getOrder(){
            let response = await axios.get("/order/" + this.orderId)

            this.order = response.data.order
        },
        goToProductPage(product){
            router.push({ name: "specificProduct", params: { productName: product.name, productId: product.id }})
        },
        timestampToDate(timestamp){
            return moment(timestamp).format('L');
        },
        discounted(product){
            return product.discount !== 0
        },
        discountPrice(product){
            return (product.price - ( product.price * ( product.discount / 100 ))).toFixed(2)
        }
    },
    mounted(){
        if (!this.order) {
            this.getOrder()
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
.product > p {
    margin-bottom: 5px;
}
.product-price-discount {
    display: flex;
    margin-bottom: 5px;
}
.price {
    font-weight: 700;
}
.discounted {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: line-through;
    margin-right: 5px;
    font-weight: 400;
}
.discount {
    font-size: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px 5px;
    font-weight: 500;
    background-color: #f4770b;
    border-radius: 5px;
    color: #ffffff;
}
.discounted-price {
    display: flex;
    align-items: center;
    font-weight: 700;
}
</style>

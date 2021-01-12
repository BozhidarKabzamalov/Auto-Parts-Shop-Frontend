<template lang="html">
    <div class="admin-order">
        <p>Номер на поръчка: {{ order.id }}</p>
        <p>Име: {{ order.firstName }} {{ order.lastName }}</p>
        <p>Телефон: {{ order.phoneNumber }}</p>
        <p>Емeйл: {{ order.email }}</p>
        <p>Град: {{ order.city }}</p>
        <p>Пощенски код: {{ order.zipCode }}</p>
        <p>Адрес: {{ order.streetAddress }}</p>
        <p>Допълнителна информация: {{ order.extraNotes }}</p>
        <p>Крайна цена: {{ order.totalPrice }} лв</p>
        <p>Дата: {{ timestampToDate(order.createdAt) }}</p>
        <div class="parts">
            <p v-for="part in order.parts">{{ part.name }}</p>
        </div>
    </div>
</template>

<script>
import moment from 'moment'

export default {
    data(){
        return {
            orderId: this.$route.params.orderId,
            order: this.$route.params.order
        }
    },
    methods: {
        timestampToDate(timestamp){
            return moment(timestamp).format('L');
        }
    },
    mounted(){
        console.log(this.$route.params.order)
    }
}
</script>

<style lang="css" scoped>
.admin-order > p {
    padding: 15px;
    border-bottom: 1px solid #dddddd;
}
</style>

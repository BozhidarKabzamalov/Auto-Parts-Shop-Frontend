<template lang="html">
    <div class="delivery-summary">
        <h1>Вашата поръчка беше успешно приета</h1>
        <h2>Очаквайте наш служител да се свърже с Вас</h2>
        <p>Поръчка №: {{ orderId }}</p>
        <p>Крайна цена: {{ orderTotalPrice }} лв</p>
        <div class="circle">
            <i class="fas fa-thumbs-up"></i>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            orderId: this.$route.params.orderId,
            orderTotalPrice: this.$route.params.orderTotalPrice
        }
    }
}
</script>

<style lang="css" scoped>
.delivery-summary {
    min-height: calc(100vh - 90px);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #dee2e6;
    padding: 20px;
    margin-top: 20px;
}
.delivery-summary h1, h2, p {
    margin-bottom: 20px;
}
.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    background-color: #40e495;
}
.fa-thumbs-up {
    font-size: 70px;
    color: #ffffff;
}
</style>

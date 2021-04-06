<template lang="html">
    <div class="delivery-summary">
        <div class="delivery-information">
            <h1>Вашата поръчка беше успешно приета</h1>
            <h2>Очаквайте наш служител да се свърже с Вас</h2>
            <p>Поръчка №: {{ orderId }}</p>
            <p>Крайна цена: {{ orderTotalPrice }} лв</p>
            <div class="circle">
                <i class="fas fa-thumbs-up"></i>
            </div>
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
    display: flex;
    justify-content: center;
    align-items: center;
}
.delivery-information {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid #dee2e6;
    padding: 50px;
    margin-top: 50px;
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

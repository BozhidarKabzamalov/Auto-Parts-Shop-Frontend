<template lang="html">
    <div class="delivery-steps">
        <p :class="{ active: selectedStep == 1 }">Количка</p>
        <p class="circle fas fa-shopping-cart"></p>
        <p class="fas fa-chevron-right"></p>
        <p :class="{ active: selectedStep == 2 }">Доставка</p>
        <p class="circle fas fa-map-marker-alt"></p>
        <p class="fas fa-chevron-right"></p>
        <p :class="{ active: selectedStep == 3 }">Изпращане</p>
        <p class="circle fas fa-truck"></p>
    </div>
</template>

<script>
    export default {
        props: [
            "selectedStep"
        ]
    }
</script>

<style lang="css" scoped>
.delivery-steps {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 80px;
    background-color: #e9e9e9;
    padding: 20px 0;
}
.delivery-steps p {
    font-size: 18px;
    font-weight: 700;
    text-transform: uppercase;
    margin-right: 20px;
}
.delivery-steps p:last-child {
    margin-right: 0px;
}
.active {
    color: #e62b2b;
}
.circle {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #ffffff;
}
</style>

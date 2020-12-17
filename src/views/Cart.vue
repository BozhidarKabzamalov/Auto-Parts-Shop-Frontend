<template lang="html">
    <div class="cart">
        <CartProductsList v-if="selectedStep == 1" @setSelectedStep="setSelectedStep"></CartProductsList>
        <CartDeliveryInformation v-if="selectedStep == 2" @setSelectedStep="setSelectedStep"></CartDeliveryInformation>
        <CartDeliverySummary v-if="selectedStep == 3"></CartDeliverySummary>
    </div>
</template>

<script>
import CartProductsList from '../components/CartProductsList.vue'
import CartDeliveryInformation from '../components/CartDeliveryInformation.vue'
import CartDeliverySummary from '../components/CartDeliverySummary.vue'

export default {
    components: {
        CartProductsList,
        CartDeliveryInformation,
        CartDeliverySummary
    },
    data(){
        return {
            selectedStep: 1
        }
    },
    methods: {
        setSelectedStep(step){
            this.selectedStep = step
        }
    }
}
</script>

<style lang="css" scoped>
</style>

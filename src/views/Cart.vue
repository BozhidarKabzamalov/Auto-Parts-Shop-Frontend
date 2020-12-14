<template lang="html">
    <div class="cart">
        <DeliverySteps :selectedStep='selectedStep'></DeliverySteps>
        <DeliveryProducts v-if='selectedStep == 1' @setSelectedStep="setSelectedStep"></DeliveryProducts>
        <DeliveryInformation v-if='selectedStep == 2' @setSelectedStep="setSelectedStep"></DeliveryInformation>
        <DeliverySummary v-if='selectedStep == 3'></DeliverySummary>
    </div>
</template>

<script>
import DeliverySteps from '../components/DeliverySteps.vue'
import DeliveryProducts from '../components/DeliveryProducts.vue'
import DeliveryInformation from '../components/DeliveryInformation.vue'
import DeliverySummary from '../components/DeliverySummary.vue'

export default {
    components: {
        DeliverySteps,
        DeliveryProducts,
        DeliveryInformation,
        DeliverySummary
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
.cart {
    padding-top: 20px;
}
</style>

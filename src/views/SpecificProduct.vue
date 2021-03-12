<template lang="html">
    <div class="specific-product wrapper">
        <div class="specific-product-container">
            <div class="image-column">
                <div class="product-image-container">
                    <img class="product-image" :src="product.image" :alt="product.name">
                </div>
            </div>
            <div class="details-column">
                <p>{{ product.name }}</p>
                <p>{{ product.description }}</p>
                <p>{{ product.manufacturer }}</p>
                <p>{{ product.serialNumber }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import router from "../router"

export default {
    metaInfo: {
      title: 'Продукт | '
    },
    data(){
        return{
            product: this.$route.params.product,
            productId: this.$route.params.productId
        }
    },
    methods:{
        async getProduct(){
            let response = await axios.get("/product/" + this.productId)

            if (response.data.product) {
                this.product = response.data.product
            } else {
                router.push({ name: "404" })
            }
        }
    },
    mounted(){
        if (!this.product) {
            this.getProduct()
        }
    }
}
</script>

<style lang="css" scoped>
.specific-product-container {
    display: flex;
    padding-top: 20px;
}
.image-column {
    flex: 200px 0 0;
}
.details-column {
    flex: 1;
    padding-left: 20px;
}
.product-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 200px;
    border: 1px solid #dee2e6;
}
.product-image {
    display: block;
    max-height: 100%;
    max-width: 100%;
}
</style>

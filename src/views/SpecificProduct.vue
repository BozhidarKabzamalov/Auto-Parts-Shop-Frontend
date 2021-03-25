<template lang="html">
    <div class="specific-product wrapper">
        <div class="specific-product-container" v-if="product">
            <div class="image-column">
                <div class="product-image-container">
                    <img class="product-image" :src="product.image" :alt="product.name">
                </div>
            </div>
            <div class="details-column">
                <h1 class="product-name">{{ product.name }}</h1>
                <div class="add-to-cart">
                    <div class="price-container">
                        <div class="product-price-discount">
                            <p class="price" :class="{ discounted: discounted }">{{ product.price }} лв</p>
                            <p class="discount" v-if="discounted">-{{ product.discount }}%</p>
                        </div>
                        <p class="discounted-price" v-if="discounted">{{ discountPrice }} лв</p>
                    </div>
                    <div @click="addToCart" class="btn btn-primary">Добави в количката</div>
                </div>
                <p class="product-description">{{ product.description }}</p>
                <div class="details-table">
                    <div class="column">
                        <p>Сериен номер</p>
                        <p>Категория</p>
                        <p>Производител</p>
                    </div>
                    <div class="column">
                        <p>{{ product.serialNumber }}</p>
                        <p>{{ product.category.name }}</p>
                        <p>{{ product.manufacturer }}</p>
                    </div>
                </div>
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
            product: undefined,
            productId: this.$route.params.productId
        }
    },
    methods:{
        async getProduct(){
            let response = await axios.get("/product/" + this.productId)
            console.log(response.data.product)
            if (response.data.product){
                this.product = response.data.product
            } else {
                router.push({ name: "404" })
            }
        },
        addToCart() {
            this.$store.dispatch("addCartItem", this.product);
        },
    },
    computed: {
        discounted(){
            return this.product.discount !== 0
        },
        discountPrice(){
            return (this.product.price - ( this.product.price * ( this.product.discount / 100 ))).toFixed(0)
        }
    },
    mounted(){
        this.getProduct()
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
.product-name {
    font-size: 36px;
    font-weight: 600;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.add-to-cart {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #dee2e6;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.price-container {
    margin-right: 20px;
}
.price {
    font-weight: 500;
    font-size: 32px;
}
.product-price-discount {
    display: flex;
}
.discounted {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: line-through;
    margin-right: 5px;
    font-size: 16px;
}
.discount {
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
    font-size: 32px;
}
.btn {
    width: 250px;
}
.details-table {
    display: flex;
}
.column {
    flex: 1;
}
.column > p {
    padding: 10px;
}
.column > p:nth-child(odd){
    background-color: #ededed;
}
.product-description {
    margin-bottom: 20px;
}
</style>

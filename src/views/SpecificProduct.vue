<template lang="html">
    <div class="specific-product wrapper">
        <div class="specific-product-container" v-if="product">
            <div class="image-column">
                <div class="product-image-container">
                    <img class="product-image" :src="product.image" :alt="product.name">
                </div>
            </div>
            <div class="details-column">
                <h1>{{ product.name }}</h1>
                <p>{{ product.description }}</p>
                <p>{{ product.manufacturer }}</p>
                <p>{{ product.serialNumber }}</p>
                <div>
                    <div class="product-price-discount">
                        <p :class="{ discounted: discounted }">{{ product.price }} лв</p>
                        <p class="discount" v-if="discounted">-{{ product.discount }}%</p>
                    </div>
                    <p class="discounted-price" v-if="discounted">{{ discountPrice }} лв</p>
                </div>
                <div class="product-quantity-container">
                    <div class="minus-button" @click="updateQuantity('-')">-</div>
                    <input class="product-quantity" type="number" name="productQuantity" min="1" max="999" @change="updateQuantity($event.target.value)" :value="quantity" required>
                    <div class="plus-button" @click="updateQuantity('+')">+</div>
                </div>
                <div @click="addToCart" class="btn btn-primary">Добави в количката</div>
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
            productId: this.$route.params.productId,
            quantity: 1
        }
    },
    methods:{
        async getProduct(){
            let response = await axios.get("/product/" + this.productId)

            if (response.data.product){
                this.product = response.data.product
            } else {
                router.push({ name: "404" })
            }
        },
        updateQuantity(operation){
            let isNumber = isNaN(parseInt(operation));

            if (!isNumber){
                if (operation < 999 && operation > 0) {
                    this.quantity = operation
                }
            } else {
                if (operation == "+") {
                    this.quantity++
                    if (this.quantity > 999) {
                        this.quantity = 999
                    }
                } else {
                    this.quantity--
                    if (this.quantity <= 0) {
                        this.quantity = 1
                    }
                }
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
            return this.product.price - ( this.product.price * ( this.product.discount / 100 ))
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
.details-column h1 {
    font-size: 36px;
    font-weight: 600;
}
.product-price-discount {
    display: flex;
    margin-bottom: 5px;
}
.discounted {
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: line-through;
    margin-right: 5px;
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
}
.product-quantity-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 144px;
    margin-right: 15px;
}
.product-quantity {
    height: 38px;
    width: 48px;
    padding: 4px;
    border: 1px solid #ddd;
    margin: 0 10px;
    outline: none;
}
.product-quantity:hover, .product-quantity:focus {
    border: 1px solid #aaa;
}
.plus-button, .minus-button {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 38px;
    height: 38px;
    border: 1px solid #ddd;
    background-color: #ffffff;
}
.plus-button:hover, .minus-button:hover {
    border: 1px solid #aaa;
}
.btn {
    width: 250px;
}
</style>

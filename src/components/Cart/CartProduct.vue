<template lang="html">
    <div class='product'>
        <div class="product-image-container">
            <img class='product-image' :src="product.image" :alt="product.name">
        </div>
        <p class="product-name">{{ product.name }}</p>
        <p class="product-manufacturer">{{ product.manufacturer }}</p>
        <div class="product-quantity-container">
            <div class="minus-button" @click="removeFromCart">-</div>
            <input class="product-quantity" type="number" name="productQuantity" min="0" max="999" @change="updateItemQuantity" :value="product.quantity" required>
            <div class="plus-button" @click="addToCart">+</div>
        </div>
        <p class="product-price">{{ product.price }} лв</p>
    </div>
</template>

<script>
export default {
    props: [
        "product"
    ],
    methods: {
        updateItemQuantity(event){
            if (event.target.value == '') {
                event.target.value = this.product.quantity
            } else {
                let payload = {
                    newQuantity: parseInt(event.target.value),
                    product: this.product
                }
                this.$store.dispatch("updateCartItem", payload)
            }
        },
        addToCart(){
            this.$store.dispatch("addCartItem", this.product)
        },
        removeFromCart(){
            this.$store.dispatch("removeCartItem", this.product)
        }
    }
}
</script>

<style lang="css" scoped>
.product {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20px 0;
    border-bottom: 1px solid #dddddd;
    cursor: pointer;
    font-size: 15px;
}
.product-image-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-right: 15px;
}
.product-image {
    display: block;
    max-height: 100%;
    max-width: 100%;
}
.product-name {
    width: 200px;
    margin-right: 15px;
}
.product-manufacturer, .product-serial-number {
    width: 120px;
    margin-right: 15px;
}
.product-price {
    width: 80px;
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

@media (max-width: 1080px) {
    .product-manufacturer {
        display: none;
    }
}

@media (max-width: 860px) {
    .product {
        flex-direction: column;
    }
    .product-image-container {
        margin-right: 0;
        margin-bottom: 15px;
    }
    .product-name {
        margin-right: 0;
        margin-bottom: 15px;
        text-align: center;
    }
    .product-manufacturer {
        display: block;
        margin-right: 0;
        margin-bottom: 15px;
        text-align: center;
    }
    .product-quantity-container {
        margin-right: 0;
        margin-bottom: 15px;
    }
    .product-price {
        text-align: center;
    }
}
</style>

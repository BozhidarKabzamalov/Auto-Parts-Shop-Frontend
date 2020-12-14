<template lang="html">
    <div class='product'>
        <div class="product-image-wrapper">
            <img class='product-image' :src="product.image" :alt="product.name">
        </div>
        <p class="product-name">{{ product.name }}</p>
        <p class="product-manufacturer">{{ product.manufacturer }}</p>
        <p class="product-serial-number">{{ product.serialNumber }}</p>
        <p class="product-price">{{ product.price }} лв</p>
        <p @click='addToCart'>+</p>
    </div>
</template>

<script>
export default {
    props: ['product'],
    methods: {
        addToCart() {
            this.$store.dispatch("addCartItem", this.product);
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
    border-bottom: 1px solid #eeeeee;
    cursor: pointer;
    font-size: 15px;
}
.product-image-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    margin-right: 10px;
}
.product-image {
    display: block;
    max-height: 100%;
    max-width: 100%;
}
.product-name {
    width: 200px;
    margin-right: 10px;
}
.product-manufacturer, .product-serial-number {
    width: 120px;
    margin-right: 10px;
}
.product-price {
    width: 80px;
}

@media (max-width: 500px) {
    .product {
        flex-direction: column;
        align-items: center;
    }
}
</style>

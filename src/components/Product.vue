<template lang="html">
    <div class='product' @click="goToProductPage()">
        <div class="product-image-container">
            <img class='product-image' :src="product.image" :alt="product.name">
        </div>
        <p class="product-name">{{ product.name }}</p>
        <p class="product-manufacturer">{{ product.manufacturer }}</p>
        <p class="product-serial-number">{{ product.serialNumber }}</p>
        <div class="product-price">
            <div class="product-price-discount">
                <p :class="{ discounted: discounted }">{{ product.price }} лв</p>
                <p class="discount" v-if="discounted">-{{ product.discount }}%</p>
            </div>
            <p class="discounted-price" v-if="discounted">{{ discountPrice }} лв</p>
        </div>
    </div>
</template>

<script>
import router from "../router"

export default {
    props: ['product'],
    methods: {
        addToCart() {
            this.$store.dispatch("addCartItem", this.product);
        },
        goToProductPage(){
            router.push({ name: "specificProduct", params: { productName: this.product.name, productId: this.product.id, product: this.product }})
        }
    },
    computed: {
        discounted(){
            return this.product.discount !== 0
        },
        discountPrice(){
            return this.product.price - ( this.product.price * ( this.product.discount / 100 ))
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
    width: 100px;
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

@media (max-width: 1080px) {
    .product-serial-number {
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
    .product-price {
        text-align: center;
    }
}
</style>

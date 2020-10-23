<template lang="html">
    <div class='part'>
        <div class="part-image-container">
            <img class='part-image responsive-image' :src="part.image" :alt="part.name">
        </div>
        <div class="">
            <p>{{ part.name }}</p>
        </div>
        <div class="">
            <p>{{ part.manufacturer }}</p>
        </div>
        <div class="">
            <p>{{ part.serial_number }}</p>
        </div>
        <div class="">
            <p>{{ part.description }}</p>
        </div>
        <div class="">
            <p>{{ part.price }}</p>
        </div>
        <div class="" @click='addToCart()'>
            <p>+</p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['part'],
    methods: {
        addToCart() {
            this.$store.dispatch("addCartItem", this.part);
        }
    }
}
</script>

<style lang="css" scoped>
.part {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #dee2e6;
}
.part-image-container {
    width: 100px;
    height: auto;
}
.part-image {
    display: block;
}
</style>

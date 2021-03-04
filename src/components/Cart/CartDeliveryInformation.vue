<template lang="html">
    <div class="delivery-information">
        <div class="row">
            <div class="column">
                <h1 class="column-title">Лични данни</h1>
                <div class="input-container">
                    <label>Име</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.firstName.$error }" type="text" name="firstName" v-model="deliveryInformation.firstName">
                </div>
                <div class="input-container">
                    <label>Фамилия</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.lastName.$error }" type="text" name="lastName" v-model="deliveryInformation.lastName">
                </div>
                <div class="input-container">
                    <label>Телефон</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.phoneNumber.$error }" type="number" name="phoneNumber" v-model="deliveryInformation.phoneNumber">
                </div>
                <div class="input-container">
                    <label>E-mail</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.email.$error }" type="email" name="email" v-model="deliveryInformation.email">
                </div>
            </div>
            <div class="column">
                <h1 class="column-title">Адрес за доставка</h1>
                <div class="input-container">
                    <label>Населено място</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.city.$error }" type="text" name="city" v-model="deliveryInformation.city">
                </div>
                <div class="input-container">
                    <label>Пощенски код</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.zipCode.$error }" type="number" name="zip" v-model="deliveryInformation.zipCode">
                </div>
                <div class="input-container">
                    <label>Адрес</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.streetAddress.$error }" type="text" name="streetAddress" v-model="deliveryInformation.streetAddress" placeholder="Или адрес на офис на Еконт/Speedy">
                </div>
                <div class="input-container">
                    <label>Допълнителна информация</label>
                    <input :class="{ 'validation-error': $v.deliveryInformation.extraNotes.$error }" type="text" name="extraNotes" v-model="deliveryInformation.extraNotes">
                </div>
            </div>
        </div>
        <div class="buttons-container">
            <div class="btn btn-primary" @click="goToCart()">
                <i class="fas fa-chevron-left"></i>
                <p>Продукти</p>
            </div>
            <div class="btn btn-secondary" @click="finishOrder">
                <p>Завърши поръчка</p>
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import router from '../../router'
import { required, minLength, maxLength, email, between, integer } from 'vuelidate/lib/validators'

export default {
    data(){
        return {
            deliveryInformation: {
                firstName: null,
                lastName: null,
                phoneNumber: null,
                email: null,
                city: null,
                zipCode: null,
                streetAddress: null,
                extraNotes: null
            }
        }
    },
    validations: {
        deliveryInformation: {
            firstName: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            lastName: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            phoneNumber: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            email: {
                email,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            city: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            zipCode: {
                required,
                integer,
                between: between(0, 9999)
            },
            streetAddress: {
                required,
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
            extraNotes: {
                minLength: minLength(1),
                maxLength: maxLength(255)
            },
        }
    },
    methods: {
        goToCart(){
            router.push({ name: 'cartProductsList' })
        },
        async finishOrder(){
            let orderInformation = {
                items: this.cart,
                deliveryInformation: this.deliveryInformation
            }

            this.$v.$touch()

            if (!this.$v.$invalid) {
                try {
                    let response = await axios.post('/createOrder', orderInformation)
                    router.push({ name: 'deliverySummary', params: { orderId: response.data.order.id, orderTotalPrice: response.data.order.totalPrice } })
                } catch (error) {
                    console.log(error)
                }
            }
        }
    },
    computed: {
        cart(){
            return this.$store.state.cart.cart
        }
    }
}
</script>

<style lang="css" scoped>
.row {
    display: flex;
}
.column {
    flex: 1;
}
.column:first-child {
    margin-right: 15px;
}
.column:last-child {
    margin-left: 15px;
}
.buttons-container {
    display: flex;
    justify-content: space-between;
}
.btn {
    height: 60px;
    width: 250px;
}
.btn-primary i {
    margin-right: 10px;
}
.btn-secondary i {
    margin-left: 10px;
}

@media (max-width: 860px) {
    .row {
        flex-direction: column;
    }
    .column:first-child {
        margin-right: 0;
    }
    .column:last-child {
        margin-left: 0;
    }
    .buttons-container {
        flex-direction: column;
        align-items: center;
        margin-bottom: 20px;
    }
    .btn-primary {
        margin-bottom: 20px;
    }
}
</style>

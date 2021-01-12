<template lang="html">
    <div class="delivery-information">
        <div class="row">
            <div class="column">
                <h1 class="column-title">Лични данни</h1>
                <div class="input-container">
                    <label>Име:</label>
                    <input type="text" name="firstName" v-model="deliveryInformation.firstName">
                </div>
                <div class="input-container">
                    <label>Фамилия:</label>
                    <input type="text" name="lastName" v-model="deliveryInformation.lastName">
                </div>
                <div class="input-container">
                    <label>Телефон:</label>
                    <input type="number" name="phoneNumber" v-model="deliveryInformation.phoneNumber">
                </div>
                <div class="input-container">
                    <label>E-mail:</label>
                    <input type="email" name="email" v-model="deliveryInformation.email">
                </div>
            </div>
            <div class="column">
                <h1 class="column-title">Адрес за доставка</h1>
                <div class="input-container">
                    <label>Населено място:</label>
                    <input type="text" name="city" v-model="deliveryInformation.city">
                </div>
                <div class="input-container">
                    <label>Пощенски код:</label>
                    <input type="number" name="zip" v-model="deliveryInformation.zipCode">
                </div>
                <div class="input-container">
                    <label>Адрес</label>
                    <input type="text" name="streetAddress" v-model="deliveryInformation.streetAddress" placeholder="Или адрес на офис на Еконт/Speedy">
                </div>
                <div class="input-container">
                    <label>Допълнителна информация:</label>
                    <input type="text" name="extraNotes" v-model="deliveryInformation.extraNotes">
                </div>
            </div>
        </div>
        <div class="buttons-container">
            <div class="previous-step" @click="setSelectedStep(1)">
                <i class="fas fa-chevron-left"></i>
                <p>Продукти</p>
            </div>
            <div class="next-step" @click="finishOrder">
                <p>Завърши поръчка</p>
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

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
    methods: {
        async finishOrder(){
            let orderInformation = {
                items: this.cart,
                deliveryInformation: this.deliveryInformation
            }

            try {
                let response = await axios.post('/createOrder', orderInformation)
                this.setSelectedStep(3)
            } catch (error) {
                console.log(error)
            }
        },
        setSelectedStep(stepNumber){
            this.$emit('setSelectedStep', stepNumber);
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
    padding-top: 20px;
    border-top: 1px solid #9a9a9a;
    display: flex;
    justify-content: space-between;
}
.next-step, .previous-step {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    height: 60px;
    width: 250px;
    cursor: pointer;
}
.next-step {
    background-color: #46b05a;
}
.next-step:hover {
    background-color: #3da34d;
}
.previous-step {
    background-color: #7289da;
}
.previous-step:hover {
    background-color: #677bc4;
}
.next-step i {
    margin-left: 10px;
}
.previous-step i {
    margin-right: 10px;
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
    .previous-step {
        margin-bottom: 20px;
    }
}
</style>

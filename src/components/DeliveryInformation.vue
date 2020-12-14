<template lang="html">
    <div class="delivery-information">
        <div class="row">
            <div class="column">
                <h1 class="column-title">Лични данни</h1>
                <div class="input-container">
                    <label>Име:</label>
                    <input type="text" name="firstName" value="">
                </div>
                <div class="input-container">
                    <label>Фамилия:</label>
                    <input type="text" name="lastName" value="">
                </div>
                <div class="input-container">
                    <label>Телефон:</label>
                    <input type="number" name="phoneNumber" value="">
                </div>
                <div class="input-container">
                    <label>E-mail:</label>
                    <input type="email" name="email" value="">
                </div>
            </div>
            <div class="column">
                <h1 class="column-title">Адрес за доставка</h1>
                <div class="input-container">
                    <label>Населено място:</label>
                    <input type="text" name="city" value="">
                </div>
                <div class="input-container">
                    <label>Пощенски код:</label>
                    <input type="number" name="zip" value="">
                </div>
                <div class="input-container">
                    <label>Адрес</label>
                    <input type="text" name="streetAddress" value="" placeholder="Или адрес на офис на Еконт/Speedy">
                </div>
                <div class="input-container">
                    <label>Допълнителна информация:</label>
                    <input type="text" name="extraNotes" value="">
                </div>
            </div>
        </div>
        <div class="buttons-container">
            <div class="previous-step" @click="setSelectedStep(1)">
                <i class="fas fa-chevron-left"></i>
                <p>Продукти</p>
            </div>
            <div class="next-step" @click="setSelectedStep(3)">
                <p>Завърши поръчка</p>
                <i class="fas fa-chevron-right"></i>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    methods: {
        setSelectedStep(stepNumber){
            this.$emit('setSelectedStep', stepNumber);
        }
    }
}
</script>

<style lang="css" scoped>
.delivery-information {
    padding-top: 20px;
}
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
.column-title {
    margin-bottom: 30px;
    font-size: 20px;
    font-weight: 700;
    text-transform: uppercase;
}
.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}
.input-container label {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 5px;
}
.input-container input {
    outline: none;
    background-color: #fff;
    width: 100%;
    max-width: 380px;
    box-shadow: none;
    padding: 10px;
    border-radius: 0;
    min-height: 39px;
    border: 1px solid #999;
    color: #606060;
    font-size: 13px;
}
.input-container input:focus {
    border: 1px solid #000;
    color: #3e3e3e;
}
.buttons-container {
    margin-top: 20px;
    padding-top: 40px;
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
</style>

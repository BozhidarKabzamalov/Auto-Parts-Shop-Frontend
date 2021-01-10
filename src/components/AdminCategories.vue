<template lang="html">
    <div class="admin-categories">
        <div class="input-container">
            <label>Име на категория:</label>
            <input type="text" name="firstName" v-model="categoryName">
        </div>
        <div @click="createCategory">Създай</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            categoryName: ""
        }
    },
    methods: {
        async createCategory(){
            let category = {
                name: this.categoryName,
                image: "https://media.discordapp.net/attachments/747469246170398824/771515998405918730/placeholder.png"
            }
            let response = await axios.post("/createCategory", category)
            console.log(response)
        }
    }
}
</script>

<style lang="css" scoped>
.input-container {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
}
.input-container:first-child {
    margin-top: 20px;
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
</style>

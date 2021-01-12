<template lang="html">
    <div class="admin-categories">
        <div class="input-container">
            <input type="text" v-model="category.name" placeholder="Име">
        </div>
        <div @click="createCategory">Създай</div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            category: {
                name: "",
                image: "https://media.discordapp.net/attachments/747469246170398824/771515998405918730/placeholder.png"
            }
        }
    },
    methods: {
        async createCategory(){
            let response = await axios.post("/createCategory", this.category)
        }
    }
}
</script>

<style lang="css" scoped>

</style>

<template lang="html">
    <div class="create-model">
        <div class="input-container">
            <input type="text" v-model="model.name" placeholder="Име">
        </div>
        <div class="input-container">
            <select v-model="model.manufacturedFrom">
                <option disabled value="">Произвеждан от</option>
                <option v-for='year in years'>{{ year }}</option>
            </select>
        </div>
        <div class="input-container">
            <select v-model="model.manufacturedTo">
                <option disabled value="">Произвеждан до</option>
                <option :value="null">Още в производство</option>
                <option v-for='year in years'>{{ year }}</option>
            </select>
        </div>
        <div class="input-container">
            <select v-model="model.brandId">
                <option disabled value="">Марка</option>
                <option v-for='brand in brands' :value='brand.id'>{{ brand.name }}</option>
            </select>
        </div>
        <div class="btn btn-primary" @click="createModel">Създай</div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
</style>

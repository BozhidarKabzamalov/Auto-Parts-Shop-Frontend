<template>
    <div id="app">
        <Navigation></Navigation>
        <div class="wrapper">
            <router-view/>
        </div>
    </div>
</template>

<script>
    import Navigation from './components/Navigation.vue'

    export default {
        components: {
            Navigation
        }
    }
</script>

<style>
*, *:after, *:before {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-decoration: none;
    list-style-type: none;
}
body {
    font-family: 'Roboto', sans-serif;
    background-color: #f3f3f3;
}
.responsive-image {
    width: 100%;
    height: 100%;
}
.wrapper {
    width: 70%;
    margin: 0 auto;
}
</style>

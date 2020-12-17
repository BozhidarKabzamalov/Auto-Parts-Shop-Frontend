<template>
    <div id="app">
        <Header></Header>
        <div class="wrapper">
            <router-view/>
        </div>
        <!--<Footer></Footer>-->
    </div>
</template>

<script>
    import Header from './components/Header.vue'
    import Footer from './components/Footer.vue'

    export default {
        components: {
            Header,
            Footer
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
    background-color: #ffffff;
    color: #333;
}
.flex {
    display: flex;
}
.responsive-image {
    width: 100%;
    height: 100%;
}
.wrapper {
    width: 70%;
    margin: 0 auto;
}
.column-title {
    padding: 20px 0;
    line-height: 35px;
    border-bottom: 1px solid #9a9a9a;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
}

@media (max-width: 500px) {
    .wrapper {
        width: 90%;
    }
}
</style>

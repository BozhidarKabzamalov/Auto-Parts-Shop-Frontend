<template>
    <div id="app">
        <Header></Header>
        <router-view/>
        <!--<Footer></Footer>-->
    </div>
</template>

<script>
    import Header from './components/Layout/Header.vue'
    import Footer from './components/Layout/Footer.vue'

    export default {
        metaInfo: {
          titleTemplate: '%sНели'
        },
        components: {
            Header,
            Footer
        },
        mounted(){
            this.$store.dispatch('autoLogin');
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
.btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    color: #ffffff;
    padding: 10px 0;
    cursor: pointer;
    user-select: none;
}
.btn-primary {
    background-color: #46b05a;
}
.btn-primary:hover {
    background-color: #3da34d;
}
.btn-secondary {
    background-color: #7289da;
}
.btn-secondary:hover {
    background-color: #677bc4;
}
.column-title {
    padding: 20px 0;
    border-bottom: 1px solid #9a9a9a;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
}
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
.input-container input, .input-container select {
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
.input-container input:focus, .input-container select:focus {
    border: 1px solid #000;
    color: #3e3e3e;
}
.input-container input:hover, .input-container select:hover {
    border: 1px solid #000;
    color: #3e3e3e;
}
.validation-error {
    border: 1px solid #f79483;
}
.validation-error:hover {
    border: 1px solid #f79483;
}
.validation-error:focus {
    border: 1px solid #f79483;
}

@media (max-width: 500px) {
    .wrapper {
        width: 90%;
    }
}
</style>

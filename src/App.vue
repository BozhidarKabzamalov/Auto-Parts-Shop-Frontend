<template>
    <div id="app">
        <Header></Header>
        <router-view class="min-height" />
        <Footer></Footer>
    </div>
</template>

<script>
    import Header from './components/Layout/Header.vue'
    import Footer from './components/Layout/Footer.vue'

    export default {
        metaInfo: {
          titleTemplate: '%sPinkeyd'
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
.min-height {
    min-height: calc(100vh - 120px);
}
.flex {
    display: flex;
}
.justify-center {
    justify-content: center;
}
.align-center {
    align-items: center;
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
    outline: none;
    border: none;
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
.btn-danger {
    background-color: #dc3545
}
.btn-danger:hover {
    background-color: #c82333;
}
.column-title {
    display: flex;
    align-items: center;
    padding: 20px 0;
    border-bottom: 1px solid #9a9a9a;
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 20px;
}
.column-title > p {
    margin-right: 10px;
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
.validation-error, .validation-error:hover, .validation-error:focus {
    border: 1px solid #f79483 !important;
}
.create-button {
    font-size: 13px;
    font-weight: 500;
    border: 1px solid #999;
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;
}
.create-button:hover {
    border: 1px solid #000;
}

@media (max-width: 500px) {
    .wrapper {
        width: 90%;
    }
}
</style>

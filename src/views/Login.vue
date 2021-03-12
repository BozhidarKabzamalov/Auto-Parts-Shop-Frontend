<template lang="html">
    <div class="login">
        <div class="login-container">
            <form @submit.prevent="login" novalidate>
                <div class="margin-bottom-20">
                    <p>Потребителско Име</p>
                    <input v-model='username' type='email'>
                </div>
                <div class="margin-bottom-20">
                    <p>Парола</p>
                    <input v-model='password' type="password">
                </div>
                <button class='btn btn-primary' type="submit" name="button">Вход</button>
            </form>
        </div>
    </div>
</template>

<script>
import router from '../router'

export default {
    metaInfo: {
      title: 'Вход | '
    },
    data(){
        return {
            username: '',
            password: ''
        }
    },
    methods: {
        login(){
            let userInfo = {
                username: this.username,
                password: this.password
            }

            this.$store.dispatch('login', userInfo);
        }
    }
}
</script>

<style lang="css" scoped>
.login {
    min-height: calc(100vh - 51px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.login-container {
    width: 500px;
    padding: 40px;
    border-radius: 5px;
    border: 1px solid #9a9a9a;
}
.margin-bottom-20 {
    margin-bottom: 20px;
}
.margin-bottom-20:last-child {
    margin-bottom: 0px;
}
.margin-bottom-20 > p {
    color: #333;
    margin-bottom: 10px;
    font-size: 12px;
    line-height: 16px;
    font-weight: 700;
    text-transform: uppercase;
}
input {
    font-size: 16px;
    width: 100%;
    height: 40px;
    padding: 10px;
    color: #dcddde;
    border: 1px solid rgba(0, 0, 0, 0.3);
    font-size: 13px;
    color: #606060;
    background-color: #fff;
    background-image: none;
    border: 1px solid #999;
    outline: 0;
}
input:focus {
    border-color: #000;
}
</style>

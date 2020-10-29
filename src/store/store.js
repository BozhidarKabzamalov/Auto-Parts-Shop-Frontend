import Vue from 'vue'
import Vuex from 'vuex'
import authentication from './authentication'
import cart from './cart'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        authentication,
        cart
    }
})

export default store

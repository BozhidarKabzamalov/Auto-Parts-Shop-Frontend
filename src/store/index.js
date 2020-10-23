import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        storeCart: []
    },
    mutations: {
        ADD_CART_ITEM(state, part) {
            state.storeCart.push(part);
        },
        REMOTE_CART_ITEM(state, part) {
            state.storeCart.splice(index, 1);
        },
    },
    actions: {
        addCartItem(context, part) {
            context.commit("ADD_CART_ITEM", part);
        },
        removeCartItem(context, part) {
            context.commit("REMOVE_CART_ITEM", index);
        }
    },
    modules: {
    }
})

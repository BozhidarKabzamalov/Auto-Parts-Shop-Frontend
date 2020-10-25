import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cart: []
    },
    mutations: {
        ADD_CART_ITEM(state, part) {
            let productInCart = state.cart.find(item => {
                return item.id === part.id
            })

            if (productInCart) {
                productInCart.quantity += part.quantity
            } else {
                state.cart.push(part)
            }
        },
        REMOTE_CART_ITEM(state, part) {
            state.cart.splice(index, 1)
        },
    },
    actions: {
        addCartItem(context, part) {
            part.quantity = 1
            context.commit("ADD_CART_ITEM", part)
        },
        removeCartItem(context, part) {
            context.commit("REMOVE_CART_ITEM", index)
        }
    },
    modules: {
    }
})

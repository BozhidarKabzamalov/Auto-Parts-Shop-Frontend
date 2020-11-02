import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const cart = {
    state: {
        cart: []
    },
    mutations: {
        ADD_CART_ITEM(state, part) {
            let productInCart = state.cart.find(item => {
                return item.id === part.id
            })

            if (productInCart) {
                Vue.set(productInCart, 'quantity', productInCart.quantity += 1);
            } else {
                Vue.set(part, 'quantity', 1);
                state.cart.push(part)
            }
        },
        REMOTE_CART_ITEM(state, part) {
            state.cart.splice(index, 1)
        },
    },
    actions: {
        addCartItem(context, part) {
            context.commit("ADD_CART_ITEM", part)
        },
        removeCartItem(context, part) {
            context.commit("REMOVE_CART_ITEM", index)
        }
    },
    getters: {
        cartItemCount: state => {
            let itemCount = 0

            state.cart.forEach(item => {
                itemCount += item.quantity
            });

            return itemCount
        }
    }
}

export default cart

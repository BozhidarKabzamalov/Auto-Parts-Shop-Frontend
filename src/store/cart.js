import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cartExists = localStorage.getItem('cart')

const cart = {
    state: {
        cart: cartExists ? JSON.parse(cartExists) : []
    },
    mutations: {
        ADD_CART_ITEM(state, product) {
            let productInCart = state.cart.find(item => {
                return item.id === product.id
            })

            if (productInCart) {
                Vue.set(productInCart, 'quantity', productInCart.quantity += 1);
            } else {
                Vue.set(product, 'quantity', 1);
                state.cart.push(product)
            }
        },
        REMOTE_CART_ITEM(state, product) {
            state.cart.splice(index, 1)
        },
    },
    actions: {
        addCartItem(context, product) {
            context.commit("ADD_CART_ITEM", product)
            context.dispatch("saveCartToLocalStorage")
        },
        removeCartItem(context, product) {
            context.commit("REMOVE_CART_ITEM", product)
            context.dispatch("saveCartToLocalStorage")
        },
        saveCartToLocalStorage(context){
            localStorage.setItem('cart', JSON.stringify(context.state.cart))
        }
    },
    getters: {
        cartItemCount: state => {
            let itemCount = 0

            state.cart.forEach(item => {
                itemCount += item.quantity
            });

            return itemCount
        },
        cartTotalPrice: state => {
            let price = 0

            state.cart.forEach(item => {
                price += item.quantity * item.price
            });

            return price
        }
    }
}

export default cart

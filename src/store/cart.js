import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let cartExists = localStorage.getItem('cart')

const cart = {
    state: {
        cart: cartExists ? JSON.parse(cartExists) : []
    },
    mutations: {
        ADD_CART_ITEM(state, product){
            let productInCart = state.cart.find(item => {
                return item.id === product.id
            })

            if (productInCart){
                Vue.set(productInCart, 'quantity', productInCart.quantity += 1);
            } else {
                Vue.set(product, 'quantity', 1);
                state.cart.push(product)
            }
        },
        REMOVE_CART_ITEM(state, product){
            Vue.set(product, 'quantity', product.quantity -= 1);
            if (product.quantity === 0){
                let index = state.cart.indexOf(product)

                state.cart.splice(index, 1)
            }
        },
        UPDATE_CART_ITEM(state, payload){
            Vue.set(payload.product, 'quantity', payload.newQuantity);
            if (payload.product.quantity === 0){
                let index = state.cart.indexOf(product)

                state.cart.splice(index, 1)
            }
        },
        CLEAR_CART(state){
            state.cart = []
        }
    },
    actions: {
        addCartItem(context, product){
            context.commit("ADD_CART_ITEM", product)
            context.dispatch("saveCartToLocalStorage")
        },
        removeCartItem(context, product){
            context.commit("REMOVE_CART_ITEM", product)
            context.dispatch("saveCartToLocalStorage")
        },
        updateCartItem(context, payload){
            context.commit("UPDATE_CART_ITEM", payload)
            context.dispatch("saveCartToLocalStorage")
        },
        saveCartToLocalStorage(context){
            localStorage.setItem('cart', JSON.stringify(context.state.cart))
        },
        clearCart(context){
            context.commit("CLEAR_CART")
            localStorage.removeItem('cart')
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
                if (item.discount === 0) {
                    price += item.quantity * item.price
                } else {
                    let discountPrice = item.price - ( item.price * item.discount / 100 )
                    price += item.quantity * discountPrice
                }

            });

            return price
        }
    }
}

export default cart

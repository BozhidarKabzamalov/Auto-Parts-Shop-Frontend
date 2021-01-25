import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SpecificProduct from '../views/SpecificProduct.vue'
import Categories from '../views/Categories.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import AdminPanel from '../views/AdminPanel.vue'
import AdminOrders from '../components/Admin/AdminOrders.vue'
import AdminOrder from '../components/Admin/AdminOrder.vue'
import AdminProducts from '../components/Admin/AdminProducts.vue'
import AdminCategories from '../components/Admin/AdminCategories.vue'
import AdminBrands from '../components/Admin/AdminBrands.vue'
import AdminModels from '../components/Admin/AdminModels.vue'
import CartProductsList from '../components/Cart/CartProductsList.vue'
import CartDeliveryInformation from '../components/Cart/CartDeliveryInformation.vue'
import CartDeliverySummary from '../components/Cart/CartDeliverySummary.vue'
import Meta from 'vue-meta'
import store from "@/store/store.js";

Vue.use(VueRouter)
Vue.use(Meta)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/product/:productName',
        name: 'specificProduct',
        component: SpecificProduct
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories
    },
    {
        path: '/cart',
        component: Cart,
        children: [
            {
                path: "",
                name: "cartProductsList",
                component: CartProductsList
            },
            {
                path: "deliveryInformation",
                name: "deliveryInformation",
                component: CartDeliveryInformation
            },
            {
                path: "deliverySummary",
                name: "deliverySummary",
                component: CartDeliverySummary
            },
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: "/admin",
        component: AdminPanel,
        beforeEnter: (to, from, next) => {
            if (!store.getters.authenticated) {
                next({ name: "login" })
            } else {
                next()
            }
        },
        children: [
            {
                path: "",
                name: "adminOrders",
                component: AdminOrders
            },
            {
                path: "order/:orderId",
                name: "adminOrder",
                component: AdminOrder
            },
            {
                path: "products",
                name: "adminProducts",
                component: AdminProducts
            },
            {
                path: "categories",
                name: "adminCategories",
                component: AdminCategories
            },
            {
                path: "brands",
                name: "adminBrands",
                component: AdminBrands
            },
            {
                path: "models",
                name: "adminModels",
                component: AdminModels
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

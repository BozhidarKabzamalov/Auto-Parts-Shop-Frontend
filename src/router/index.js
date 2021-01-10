import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SpecificProduct from '../views/SpecificProduct.vue'
import Categories from '../views/Categories.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import AdminPanel from '../views/AdminPanel.vue'
import AdminOrders from '../components/AdminOrders.vue'
import AdminOrder from '../components/AdminOrder.vue'
import AdminProducts from '../components/AdminProducts.vue'
import AdminCategories from '../components/AdminCategories.vue'
import AdminBrands from '../components/AdminBrands.vue'
import AdminModels from '../components/AdminModels.vue'
import Meta from 'vue-meta'

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
        name: 'cart',
        component: Cart
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: "/admin",
        component: AdminPanel,
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

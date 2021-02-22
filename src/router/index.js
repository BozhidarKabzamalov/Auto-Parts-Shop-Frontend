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
import CreateProduct from '../components/Admin/CreateProduct.vue'
import CreateCategory from '../components/Admin/CreateCategory.vue'
import CreateBrand from '../components/Admin/CreateBrand.vue'
import CreateModel from '../components/Admin/CreateModel.vue'
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
                path: "products/createProduct",
                name: "createProduct",
                component: CreateProduct
            },
            {
                path: "categories",
                name: "adminCategories",
                component: AdminCategories
            },
            {
                path: "categories/createCategory",
                name: "createCategory",
                component: CreateCategory
            },
            {
                path: "brands",
                name: "adminBrands",
                component: AdminBrands
            },
            {
                path: "brands/createBrand",
                name: "createBrand",
                component: CreateBrand
            },
            {
                path: "models",
                name: "adminModels",
                component: AdminModels
            },
            {
                path: "models/createModel",
                name: "createModel",
                component: CreateModel
            },
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

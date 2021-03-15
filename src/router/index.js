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
import UpdateBrand from '../components/Admin/UpdateBrand.vue'
import CreateModel from '../components/Admin/CreateModel.vue'
import NotFound from '../views/404.vue'
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
        path: '/product/:productName/:productId',
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
        component: Login,
        beforeEnter: async (to, from, next) => {
            await store.dispatch('autoLogin');

            if (store.getters.authenticated) {
                next({ name: "adminOrders" })
            } else {
                next();
            }
        }
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
                path: "brands/updateBrand",
                name: "updateBrand",
                component: UpdateBrand
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
        ],
        beforeEnter: async (to, from, next) => {
            await store.dispatch('autoLogin');

            if (store.getters.authenticated) {
                next();
            } else {
                next({ name: "login" })
            }
        }
    },
    {
        path: "/404",
        name: "404",
        component: NotFound
    },
    {
        path: '*',
        redirect: '/404'
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Categories from '../views/Categories.vue'
import Category from '../views/Category.vue'
import Cart from '../views/Cart.vue'
import Login from '../views/Login.vue'
import AdminPanel from '../views/AdminPanel.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home
    },
    {
        path: '/categories',
        name: 'categories',
        component: Categories
    },
    {
        path: '/category',
        name: 'category',
        component: Category
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
        path: '/admin',
        name: 'admin',
        component: AdminPanel
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router

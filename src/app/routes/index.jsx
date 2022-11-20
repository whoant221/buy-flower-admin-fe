import Home from '../pages/Home/index.jsx'
import Customer from '../pages/manageCustomer/index.jsx'
import Order from '../pages/manageOrder/index.jsx'
import Product from '../pages/manageProduct/index.jsx'
import TurnOver from '../pages/turnOver/index.js'
import Voucher from '../pages/voucher/index.js'

export const routes = [
    { path: '/', component: Home },
    { path: '/customer', component: Customer },
    { path: '/order', component: Order },
    { path: '/product', component: Product },
    { path: '/turnover', component: TurnOver },
    { path: '/voucher', component: Voucher },
]
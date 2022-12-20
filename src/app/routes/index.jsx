import HomePage from '../pages/Home/index.jsx'
import Customer from '../pages/ManageCustomer/index.jsx'
import Order from '../pages/ManageOrder/index.jsx'
import ManageFLower from '../pages/ManageFlower/index.jsx'
import TurnOver from '../pages/TurnOver/index.js'
import ManageVoucher from '../pages/ManageVoucher'
import ManageBud from "../pages/ManagerBud";
import ManageCategory from "../pages/ManageCategory";

export const routes = [
    { path: '/', component: HomePage },
    { path: '/customer', component: Customer },
    { path: '/bud', component: ManageBud },
    { path: '/category', component: ManageCategory },
    { path: '/order', component: Order },
    { path: '/flower', component: ManageFLower },
    { path: '/turnover', component: TurnOver },
    { path: '/voucher', component: ManageVoucher },
]

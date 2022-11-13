import Main from "./pages/Main";
import {BASKET_ROUTE, DEVICE_ROUTE, MAIN_ROUTE, MY_ORDERS_ROUTE} from "./utils/consts";
import DevicePage from "./pages/DevicePage";
import Basket from "./pages/Basket";
import MyOrdersPage from "./pages/MyOrdersPage";


export const publicRoutes = [
    {
        path: MAIN_ROUTE,
        Component: Main
    },
    {
        path: DEVICE_ROUTE + '/:id',
        Component: DevicePage
    },
]
export const authRoutes = [...publicRoutes,
    {
        path: BASKET_ROUTE,
        Component: Basket
    },
    {
      path: MY_ORDERS_ROUTE,
      Component: MyOrdersPage
    }
]
export const moderatorRoutes = [...authRoutes,

]
export const adminRoutes = [...moderatorRoutes]
import Main from "./pages/Main";
import {BASKET_ROUTE, DEVICE_ROUTE, MAIN_ROUTE} from "./utils/consts";
import DevicePage from "./pages/DevicePage";
import Basket from "./pages/Basket";


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
    }
]
export const moderatorRoutes = [...authRoutes,

]
export const adminRoutes = [...moderatorRoutes]
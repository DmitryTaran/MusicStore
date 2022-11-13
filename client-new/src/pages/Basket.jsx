import React, {useContext, useEffect, useMemo} from 'react';
import DeviceInBasketList from "../components/DeviceInBasketList/DeviceInBasketList";
import CreateOrderPanel from "../components/CreateOrderPanel/CreateOrderPanel";
import {Context} from "../index";
import {observer} from "mobx-react-lite";
import {useFetching} from "../hooks/useFetching";
import {getAllDevicesInOrder} from "../http/orderAPI";
import Loading from "../components/UI/Loading/Loading";

const Basket = observer(() => {

    const {basket, user} = useContext(Context)

    const [getDevices, isGetDevicesLoading, getDevicesMessage] = useFetching(async () => {
        await getAllDevicesInOrder(basket.basket.id).then(data => basket.setDevices(data))
    })


    useEffect(() => {
        getDevices()
    }, [])

    if (isGetDevicesLoading)
        return (
            <Loading isLoading={isGetDevicesLoading}/>
        )
    return (
        <>
            <div className="basketTitle">
                <h1>Корзина</h1>
            </div>

            {basket.devices.length === 0
                ? <div className="basketEmpty">
                    <CreateOrderPanel totalPrice={basket.totalCost} isVisible={false}/>
                    Корзина пуста
                </div>
                : <div className="basketPage">
                    <DeviceInBasketList/>
                    <CreateOrderPanel totalPrice={basket.totalCost} isVisible={true}/>
                </div>
            }

            </>

    )
})

export default Basket;
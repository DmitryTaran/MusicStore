import React, {useContext, useMemo} from 'react';
import DeviceInBasketList from "../components/DeviceInBasketList/DeviceInBasketList";
import CreateOrderPanel from "../components/CreateOrderPanel/CreateOrderPanel";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const Basket = observer(() => {

    const {basket} = useContext(Context)

    const totalPrice = useMemo(() => {
        console.log('Пересчет')
        return basket.devices.reduce((accum, item) => accum + (item.price * item.count), 0)
    }, [basket.devices])


    return (
        <>
            <div className="basketTitle">
                <h1>Корзина</h1>
            </div>

            {basket.devices.length === 0
                ? <div className="basketEmpty">Корзина пуста</div>
                : <div className="basketPage">
                    <DeviceInBasketList/>
                    <CreateOrderPanel totalPrice={totalPrice}/>
                </div>
            }

            </>

    )
})

export default Basket;
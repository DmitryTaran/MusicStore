import React, {useContext, useEffect, useState} from 'react';
import classes from './DeviceInBasketItem.module.css'
import Button from "../UI/Button/Button";
import Counter from "../Counter/Counter";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
import {useFetching} from "../../hooks/useFetching";
import {deleteDeviceFromOrder, updateCount} from "../../http/orderAPI";
import Loading from "../UI/Loading/Loading";
const DeviceInBasketItem = observer (({device}) => {

    const {notice, basket} = useContext(Context)

    const [count, setCount] = useState(parseInt(device?.deviceInOrders[0]?.count))

    useEffect(() => {
        updateDeviceCount()
    }, [count])

    const [deleteDevice, isDeleteDeviceLoading, deleteDeviceMessage] = useFetching(async () => {
        await deleteDeviceFromOrder(device.id, basket.basket.id)
        basket.deleteDevice(device)

    }, 'Товар удален из корзины')

    const [updateDeviceCount, isUpdateDeviceCountLoading, updateDeviceCountMessage] = useFetching(async () => {
        await updateCount(device.id, basket.basket.id, count).then(data => {
            basket.setDeviceInBasketCount(device, data)
        })
    })

    useEffect(() => {

        return () => {
            if (deleteDeviceMessage.message)
                notice.addNotice(deleteDeviceMessage)
        }
    }, [deleteDeviceMessage])

    return (
        <div className={classes.deviceInBasketBlock}>
            <Loading isLoading={isDeleteDeviceLoading || isUpdateDeviceCountLoading}/>
            <div className={classes.leftSide}>
                <img src={process.env.REACT_APP_API_URL + device.img} alt=""/>
                <div className={classes.deviceName}>{device.name}</div>
            </div>

            <div className={classes.rightSide}>
                <div className={classes.devicePrice}>
                    {device.price} руб.
                </div>
                <Counter count={count} setCount={setCount}/>
                    <Button onClick={deleteDevice}>Удалить</Button>

            </div>

        </div>
    );
});

export default DeviceInBasketItem;
import React, {useContext, useEffect, useState} from 'react';
import classes from './DeviceInBasketItem.module.css'
import MyImage from '../../assets/guitar.jpg'
import Button from "../UI/Button/Button";
import Counter from "../Counter/Counter";
import {Context} from "../../index";
import {observer} from "mobx-react-lite";
const DeviceInBasketItem = observer (({device}) => {

    const [count, setCount] = useState(1)
    const {basket} = useContext(Context)


    useEffect(() => {
        const newDevice ={...basket.devices.find((d) => d.id === device.id)}
        newDevice.count = count
        basket.setDevices(basket.devices.filter(deviceInBasket => deviceInBasket.id !== device.id))
        basket.setDevices([...basket.devices, newDevice])
    }, [count])

    const removeDevice = (device) => {
        basket.setDevices(basket.devices.filter(d => d.id !== device.id))
    }

    return (
        <div className={classes.deviceInBasketBlock}>
            <div className={classes.leftSide}>
                <img src={MyImage} alt=""/>
                <div className={classes.deviceName}>{device.name}</div>
            </div>

            <div className={classes.rightSide}>
                <div className={classes.devicePrice}>
                    {device.price}руб.
                </div>
                <Counter count={count} setCount={setCount}/>
                    <Button onClick={() => removeDevice(device)}>Удалить</Button>

            </div>

        </div>
    );
});

export default DeviceInBasketItem;
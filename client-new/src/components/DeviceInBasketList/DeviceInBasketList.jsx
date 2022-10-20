import React, {useContext, useState} from 'react';
import classes from './DeviceInBasketList.module.css'
import {Context} from "../../index";
import DeviceInBasketItem from "../DeviceInBasketItem/DeviceInBasketItem";
import {observer} from "mobx-react-lite";


const DeviceInBasketList = observer(() => {

    const {basket} = useContext(Context)

    return (
        <div className={classes.deviceInBasketList}>
            {basket.devices.map((device) =>
                <DeviceInBasketItem key={device.id} device={device}/>
            )}
        </div>
    );

});

export default DeviceInBasketList;
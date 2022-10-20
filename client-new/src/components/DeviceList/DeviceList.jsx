import React, {useContext} from 'react';
import DeviceItem from "../DeviceItem/DeviceItem";
import classes from './DeviceList.module.css'
import {Context} from "../../index";

const DeviceList = () => {

    const {device} = useContext(Context)

    return (
        <div className={classes.deviceList}>
            {device.devices.map(device =>
                <DeviceItem key={device.id} device={device}/>
            )}
        </div>
    );
};

export default DeviceList;
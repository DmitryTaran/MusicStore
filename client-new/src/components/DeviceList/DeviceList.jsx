import React, {useContext, useEffect} from 'react';
import DeviceItem from "../DeviceItem/DeviceItem";
import classes from './DeviceList.module.css'
import {Context} from "../../index";
import {useFetching} from "../../hooks/useFetching";
import {getAllDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import Pagination from "../UI/Pagination/Pagination";

const DeviceList = observer (() => {

    const {device} = useContext(Context)

    const [fetchDevices, isFetchDevicesLoading, fetchDevicesError] = useFetching(async () => {
        await getAllDevices(device.selectedType.description, 9, 1).then((data) => {
            device.setDevices(data.rows)
        })
    })

    useEffect(() => {
        fetchDevices()
    }, [])

    return (
            <div className={classes.deviceList}>
                {device.devices.map(device =>
                    <DeviceItem key={device.id} device={device}/>
                )}
            </div>
    );
});

export default DeviceList;
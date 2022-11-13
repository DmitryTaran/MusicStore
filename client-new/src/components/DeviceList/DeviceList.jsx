import React, {useContext, useEffect} from 'react';
import DeviceItem from "../DeviceItem/DeviceItem";
import classes from './DeviceList.module.css'
import {Context} from "../../index";
import {useFetching} from "../../hooks/useFetching";
import {getAllDevices} from "../../http/deviceAPI";
import {observer} from "mobx-react-lite";
import Pagination from "../UI/Pagination/Pagination";
import Loading from "../UI/Loading/Loading";

const DeviceList = observer (() => {

    const {device} = useContext(Context)


    const [fetchDevices, isFetchDevicesLoading, fetchDevicesError] = useFetching(async () => {
        await getAllDevices(device.selectedType.description, device.limit, device.page).then((data) => {
            device.setDevices(data.rows)
            device.setTotalCount(data.count)
        })
    })

    useEffect(() => {
        fetchDevices()
    }, [device.selectedType, device.page])

    return (
            <div className={classes.deviceList}>
                <Loading isLoading={isFetchDevicesLoading}/>
                {device.devices.map(device =>
                    <DeviceItem key={device.id} device={device}/>
                )}
            </div>
    );
});

export default DeviceList;
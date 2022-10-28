import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import DeviceView from "../components/DeviceView/DeviceView";
import DeviceInfosList from "../components/DeviceInfosList/DeviceInfosList";
import Comments from "../components/Comments/Comments";
import {useFetching} from "../hooks/useFetching";
import {getAllComments, getAllDeviceInfos, getOneDevice} from "../http/deviceAPI";
import Loading from "../components/UI/Loading/Loading";
import {Context} from "../index";

const DevicePage = observer(() => {

    const {oneDevice} = useContext(Context)

    const {id} = useParams()

    const [fetchOneDevice, isFetchOneDeviceLoading, fetchOneDeviceError] = useFetching(async () => {
        await getOneDevice(id).then((device) => oneDevice.setDevice(device))
        await getAllDeviceInfos(id).then((infos) => oneDevice.setDeviceInfos(infos))
        await getAllComments(id).then((comments) => oneDevice.setComments(comments))
    })
    useEffect(() => {
        fetchOneDevice()
    }, [])
    return (
        <div className="devicePage">
            <Loading isLoading={isFetchOneDeviceLoading}/>
            <DeviceView device={oneDevice.device}/>
            <DeviceInfosList deviceInfos={oneDevice.deviceInfos}/>
            <Comments comments={oneDevice.comments} />
        </div>
    );
});

export default DevicePage;
import React, {useContext, useState} from 'react';
import {Context} from "../index";
import {useParams} from "react-router-dom";
import {observer} from "mobx-react-lite";
import DeviceView from "../components/DeviceView/DeviceView";
import DeviceInfosList from "../components/DeviceInfosList/DeviceInfosList";
import Comments from "../components/Comments/Comments";

const DevicePage = observer(() => {

    const {device, basket, user} = useContext(Context)
    const {id} = useParams()
    const chosenDevice = device.devices.find(device => device.id == id)
    const [comments, setComments] = useState([
        {id: 1, userName: 'Валерия Язагит', text: 'Отличная скрипка', date: '21/12/1488', rating: 5},
        {id: 2, userName: 'Яков Лава', text: 'Хуйня', date: '21/12/1337', rating: 5},
    ])
    const deviceInfos = [
        {id:1, name: 'Количество струн', description: '5'},
        {id:2, name: 'Материал корпуса', description: 'Дерево'},
        {id:3, name: 'Материал грифа', description: 'Береза'},
        {id:4, name: 'Тремоло', description: 'Да'},
    ]



    return (
        <div className="devicePage">

            <DeviceView device={chosenDevice}/>
            <DeviceInfosList deviceInfos={deviceInfos}/>
            <Comments comments={comments} setComments={setComments}></Comments>
        </div>
    );
});

export default DevicePage;
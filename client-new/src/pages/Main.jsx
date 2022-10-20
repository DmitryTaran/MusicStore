import React from 'react';
import TypeBar from "../components/TypeBar/TypeBar";
import DeviceItem from "../components/DeviceItem/DeviceItem";
import DeviceList from "../components/DeviceList/DeviceList";
import Button from "../components/UI/Button/Button";

const Main = () => {


    return (
        <div className="mainPage">
            <TypeBar/>
            <DeviceList/>
        </div>
    );
};

export default Main;
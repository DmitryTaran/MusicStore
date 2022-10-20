import React from 'react';
import TypeBar from "../components/TypeBar/TypeBar";
import DeviceList from "../components/DeviceList/DeviceList";

const Main = () => {


    return (
        <div className="mainPage">
            <TypeBar/>
            <DeviceList/>
        </div>
    );
};

export default Main;